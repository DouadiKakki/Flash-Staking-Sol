//@ts-nocheck

import React, { useState } from 'react';
import IconButton from '../../components/IconButton';
import Input from '../../components/Input';
import DefaultSelect from '../../components/Select';
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';

const Stakes = () => {

	const [amount, setAmount] = useState(0);
	const [period, setPeriod] = useState(0);

	const { connection } = useConnection();
	const { connected, publicKey, sendTransaction } = useWallet();

	const handleStake = async () => {
		if (Number(amount) <= 0) {
			return toast.error("Please input the correct stake amount!");
		}
		if (period <= 0) {
			return toast.error("Please select the Lock option!");
		}
		if (!connected) {
			return toast.error("Please connect your wallet!");
		}

	}

	return (
		<div className='w-full h-full flex flex-col p-[16px] md:p-[24px] bg-[#1b1b1b] rounded-[8px] md:rounded-[12px]'>
			<div className='text-white text-[14px] md:text-[16px] font-[500]'>Stake here</div>
			<div className='w-full h-[1px] bg-[#2e2e2e] mt-[12px] md:mt-[22px]'></div>

			<div className='w-full flex flex-col gap-[20px] mt-[20px]'>
				<Input
					label='Amount to Stake'
					value={amount}
					setValue={(val) => setAmount(Number(val) || 0)}
				/>
				<DefaultSelect
					label='Bonus Lock Option'
					options={[
						{ value: 0, label: "Select Lock" },
						{ value: 30, label: "30 Days - 0.15% Reward" },
						{ value: 90, label: "90 Days - 0.50% Reward" },
						{ value: 180, label: "180 Days - 1.4% Reward" },
						{ value: 365, label: "365 Days - 3% Reward" },
					]}
					value={period}
					setValue={setPeriod}
				/>
				<IconButton
					text='Stake'
					className='w-full'
					py='py-[12px]'
					onClick={handleStake}
				/>
			</div>
		</div>
	);
};

export default Stakes;
