//@ts-nocheck

import React from 'react';

import TitleBox from '../../components/TitleBox';
import Icon1 from "../../assets/imgs/icon-deposit.png";
import Icon2 from "../../assets/imgs/icon-accumulate.png";
import Icon3 from "../../assets/imgs/icon-points.png";
import BgCard from "../../assets/imgs/bg-card.svg";


const steps = [
	{
		img: Icon1,
		title: "Deposit your FLASH tokens",
		desc: "Deposit your FLASH tokens into the staking pool to start earning points and unlocking exclusive rewards. The more you stake, the greater the benefits, including fee reductions and premium experiences."
	},
	{
		img: Icon2,
		title: "Accumulate points",
		desc: "Earn points based on your staked FLASH tokens and lock duration. Larger and longer stakes unlock greater rewards and exclusive perks."
	},
	{
		img: Icon3,
		title: "Use Your Points",
		desc: "Unlock up to 100% fee reductions, exclusive airdrops, and enhanced loyalty benefits on Flash Transfer and Flash Wallet"
	},
];

const HowTo = () => {

	return (
		<div id="howto" className='w-full px-[20px] pt-[80px] lg:pt-[160px]'>
			<div className='max-w-full w-[1440px] mx-auto flex flex-col justify-center items-center gap-4'>
				<TitleBox text="Simple Steps to Stake" />
				<div className='text-[24px] lg:text-[64px] text-center font-[500] h-[40px] lg:h-[100px] bg-gradient-to-b from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent'>
					How Flash Staking Works
				</div>
				<div className='text-[16px] lg:text-[18px] text-center font-[400] text-[#B3B3B3] lg:leading-[30px] max-w-[717px]'>
					Staking operates on a shareholder model, where rewards are distributed to stakers based on the percentage of FLASH tokens they stake in the pool, ensuring fair rewards.
				</div>
				<div className='w-full flex scale-90 lg:scale-100 flex-col lg:flex-row gap-[36px] lg:gap-[42px] justify-center items-center mt-[-50px] lg:mt-[50px]'>
					{steps.map((item, index) =>
					(
						<div key={index} className='relative w-[383px] h-[477px] px-[24px] flex flex-col justify-start items-center overflow-hidden bg-gradient-to-b from-[#1E1E1E] to-[#151515] border-t-4 border-[rgba(255,192,0,1)] rounded-b-[20px] hover:scale-110 transition-all duration-500'>
							<img src={BgCard} className='w-[409px] absolute top-[-20px] left-0 z-10' />
							<div className='text-white text-[16px] mt-[20px] z-20'>Step{index + 1}</div>
							<img src={item.img} className='w-[98px] h-[98px] mt-[30px] z-20' alt='flash' />
							<div className='text-white text-center text-[24px] mt-[65px] z-20'>{item.title}</div>
							<div className='text-[#B3B3B3] text-center text-[16px] font-[400] mt-[16px]'>{item.desc}</div>
						</div>
					)
					)}
				</div>
			</div>
		</div>
	);
};

export default HowTo;
