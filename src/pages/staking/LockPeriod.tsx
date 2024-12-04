//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { numberFormatter } from '../../utils/utils';
import dayjs from 'dayjs';

const LockPeriod = () => {

	const [balance, setBalance] = useState(0);
	const [unlockTime, setUnlockTime] = useState(null);
	const [day, setDay] = useState(0);
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);

	useEffect(() => {
		let date = new Date(1733513008000);
		setUnlockTime(date);

		setBalance(25000);
	}, []);

	useEffect(() => {
		if (!unlockTime) {
			return;
		}

		const second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24;

		const countDown = unlockTime.getTime() + (23 * 60 - new Date().getTimezoneOffset()) * 60 * 1000;
		const timer = setInterval(function () {
			const now = new Date().getTime(), distance = countDown - now;

			setDay(Math.floor(distance / (day)))
			setHour(Math.floor((distance % (day)) / (hour)))
			setMinute(Math.floor((distance % (hour)) / (minute)))
			setSecond(Math.floor((distance % (minute)) / second))

			//do something later when date is reached
			if (distance < 0) {
				clearInterval(timer);
			}
		}, 1000);

		return () => clearInterval(timer);
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
			<div className='text-white text-[18px] md:text-[28px] font-[400] mt-[20px]'>
				${numberFormatter(balance)} FLASH
			</div>
			<div className='text-[#606060] text-[12px] md:text-[14px] font-[400]'>Balance</div>
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
