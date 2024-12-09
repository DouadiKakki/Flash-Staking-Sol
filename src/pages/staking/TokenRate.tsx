//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { dollarFormatter2, numberFormatter } from '../../utils/utils';

import ImgFlash from "../../assets/imgs/flash3.svg";
import ImgSol from "../../assets/imgs/sol.svg";
import ImgUsdt from "../../assets/imgs/usdt.svg";
import { getTokenRates } from '../../utils/utils';
import { useInterval } from 'usehooks-ts';

const tokens = [
	{
		icon: ImgFlash,
		name: "Flash",
		symbol: "Flash",
	},
	{
		icon: ImgSol,
		name: "Solana",
		symbol: "SOL",
	},
	{
		icon: ImgUsdt,
		name: "Tether USD",
		symbol: "USDT",
	},
];

const TokenRate = () => {
	const [rates, setRates] = useState(null);

	useEffect(() => {
		getRates();
	}, []);

	const getRates = async () => {
		const result = await getTokenRates();
		if (result) {
			setRates(result);
		}
	}
	useInterval(getRates, 10000);


	return (
		<div className='w-full h-full flex flex-col p-[16px] md:p-[24px] bg-[#1b1b1b] rounded-[8px] md:rounded-[12px]'>
			<div className='text-white text-[14px] md:text-[16px] font-[500]'>Token Rate</div>
			<div className='w-full h-[1px] bg-[#2e2e2e] mt-[12px] md:mt-[22px]'></div>
			<div className='mt-[20px] md:mt-[24px] flex flex-col gap-[8px]'>
				{tokens.map((item, index) =>
					<div key={index} className='bg-[#222222] rounded-[12px] px-[16px] py-[12px] flex flex-row justify-between items-center gap-[12px]'>
						<img src={item.icon} alt='token' className='w-[40px] h-[40px]' />
						<div>
							<div className='text-white text-[14px] font-[500]'>{item.symbol}</div>
							<div className='text-[#606060] text-[12px] font-[400] mt-2'>{item.name}</div>
						</div>
						<div className='flex-grow'>
						</div>
						<div>
							<div className='text-white text-right text-[14px] font-[500]'>${numberFormatter(rates?.[item.symbol]?.price ?? 0)}</div>
							<div className={`${rates?.[item.symbol]?.percent >= 0 ? 'text-[#0ad83d]' : 'text-[#f31317]'} text-right text-[12px] font-[400] mt-2`}>
								{rates?.[item.symbol]?.percent >= 0 && '+'}{rates?.[item.symbol]?.percent}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TokenRate;
