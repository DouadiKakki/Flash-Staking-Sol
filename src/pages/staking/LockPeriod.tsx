//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { numberFormatter } from '../../utils/utils';
import dayjs from 'dayjs';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { formatAmount, getUserStakeInfo, unstake } from '../../utils/web3-utils';
import IconButton from '../../components/IconButton';
import { toast } from 'react-toastify';

const LockPeriod = ({ updateKey, onPoolChanged = () => { } }) => {

	const { connection } = useConnection();
	const { connected, publicKey } = useWallet();
	const wallet = useAnchorWallet();

	const [isLoading, setIsLoading] = useState(false);

	const [stakeId, setStakeId] = useState(-1);
	const [balance, setBalance] = useState(0);
	const [unlockTime, setUnlockTime] = useState(null);
	const [canClaim, setCanClaim] = useState(false);

	const [day, setDay] = useState(0);
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);


	useEffect(() => {
		clear();
		if (connected) {
			loadUnlockInfo();
		}
	}, [connected, updateKey]);

	const clear = (timeOnly = false) => {
		setDay(0);
		setHour(0);
		setMinute(0);
		setSecond(0);
		if (!timeOnly) {
			setUnlockTime(null);
			setBalance(0);
			setStakeId(-1);
			setCanClaim(false);
		}
	}

	const loadUnlockInfo = async () => {
		try {
			const userStakeInfo = await getUserStakeInfo(publicKey);
			if (!userStakeInfo) {
				return;
			}
			let id = 0;
			let currentStakingInfo = null;
			for (let i = 0; i < userStakeInfo.stakingList.length; i++) {
				const stakingInfo = userStakeInfo.stakingList[i];
				if (stakingInfo.unstaked) {
					continue;
				}
				if (currentStakingInfo == null) {
					id = i;
					currentStakingInfo = stakingInfo;
				} else if (currentStakingInfo.finishedTime > stakingInfo.finishedTime) {
					id = i;
					currentStakingInfo = stakingInfo;
				}
			}
			if (currentStakingInfo) {
				setStakeId(id);
				setBalance(formatAmount(currentStakingInfo.stakeAmount) + formatAmount(currentStakingInfo.profit));
				setUnlockTime(new Date(Number(currentStakingInfo.finishedTime) * 1000));
			}
		} catch (err) {
		}
	}

	useEffect(() => {
		if (!unlockTime) {
			return;
		}

		const seconds = 1000,
			minutes = seconds * 60,
			hours = minutes * 60,
			days = hours * 24;

		const countDown = unlockTime.getTime();// + new Date().getTimezoneOffset() * 60 * 1000;
		const timer = setInterval(function () {
			const now = new Date().getTime();
			const distance = countDown - now;

			if (distance <= 0) {
				clearInterval(timer);
				clear(true);
				setCanClaim(true);
			} else {
				setDay(Math.floor(distance / (days)))
				setHour(Math.floor((distance % (days)) / (hours)))
				setMinute(Math.floor((distance % (hours)) / (minutes)))
				setSecond(Math.floor((distance % (minutes)) / seconds))
			}
		}, 1000);

		return () => {
			clear();
			clearInterval(timer)
		}
	}, [unlockTime]);

	const renderTimeCard = (label, num) => {
		let values = [];
		if (num > 99) {
			values.push(parseInt(num / 100));
			num = num % 100;
		}
		if (num > 9) {
			values.push(parseInt(num / 10));
			num = num % 10;
		} else {
			values.push(0);
		}
		values.push(num);

		return (
			<div className='flex flex-col justify-center items-center gap-[8px] md:gap-[14px]'>
				<div className='flex flex-row justify-center items-center gap-[2px] md:gap-[4px]'>
					{values.map((val, index) =>
						<div key={index} className='p-[2px] bg-gradient-to-t from-[#1d1d1d] to-[#373535] rounded-[4px] md:rounded-[7px]'>
							<div className='bg-gradient-to-b from-[#252525] to-[#1d1d1d] text-white text-[18px] md:text-[30px] px-[10px] md:px-[16px] py-[12px] md:py-[12px] rounded-[4px] md:rounded-[7px]'>
								{val}
							</div>
						</div>
					)}
				</div>
				<div className='text-white text-[14px] uppercase'>{label}</div>
			</div>
		);
	}

	const handleUnstake = async () => {
		setIsLoading(true);
		const tx = await unstake(connection, publicKey, stakeId);
		setIsLoading(false);
		if (tx) {
			toast.success("Claim succeed!");
			if (onPoolChanged) {
				onPoolChanged();
			}
		} else {
			toast.error("Failed to claim!");
		}
	}

	return (
		<div className='w-full h-full flex flex-col p-[16px] md:p-[24px] bg-[#1b1b1b] rounded-[8px] md:rounded-[12px]'>
			<div className='text-white text-[14px] md:text-[16px] font-[500]'>Lock Period</div>
			<div className='w-full h-[1px] bg-[#2e2e2e] mt-[12px] md:mt-[22px]'></div>
			{unlockTime &&
				<div className='w-full flex flex-row justify-between text-[#B3B3B3] text-[12px] mt-[16px]'>
					<span>{dayjs(unlockTime).format("MMM DD, YYYY")}</span>
					<span>{dayjs(unlockTime).format("dddd")}</span>
				</div>
			}
			<div className='w-full flex flex-row justify-between items-center mt-[20px]'>
				<div>
					<div className='text-white text-[18px] md:text-[28px] font-[400]'>
						${numberFormatter(balance)} FLASH
					</div>
					<div className='text-[#606060] text-[12px] md:text-[14px] font-[400]'>Balance</div>
				</div>
				{(canClaim) &&
					<div>
						<IconButton
							text='Claim'
							className='w-[150px]'
							py='py-[12px]'
							onClick={handleUnstake}
							disabled={isLoading}
						/>
					</div>
				}
			</div>
			<div className='w-full bg-[#131313] border border-[#2e2e2eb3] rounded-[8px] md:rounded-[12px] p-[12px] md:p-[20px] flex flex-row justify-center items-center mt-[20px] md:mt-[24px] gap-[2px] md:gap-[4px] overflow-hidden'>
				{renderTimeCard('Day', day)}
				<div className='text-white text-[24px] font-bold mb-[36px]'>:</div>
				{renderTimeCard('Hour', hour)}
				<div className='text-white text-[24px] font-bold mb-[36px]'>:</div>
				{renderTimeCard('Min', minute)}
				<div className='text-white text-[24px] font-bold mb-[36px]'>:</div>
				{renderTimeCard('Sec', second)}
			</div>
		</div>
	);
};

export default LockPeriod;
