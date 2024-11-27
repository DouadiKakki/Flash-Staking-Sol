//@ts-nocheck

import React from 'react';

import ImgBG from "../../assets/imgs/bg-stake.png";
import IconFlash from "../../assets/imgs/flash2.svg";
import IconCrown from "../../assets/imgs/crown.svg";
import IconRocket from "../../assets/imgs/rocket.svg";
import Img from "../../assets/imgs/img-1.png";

const whyStakes = [
	{
		img: IconFlash,
		title: "Earn Flash Points",
		desc: "Every deposit increases your points, unlocking exclusive perks."
	},
	{
		img: IconCrown,
		title: "Transaction Fee Reductions & Subscription",
		desc: "Get up to 100% off for the most active users."
	},
	{
		img: IconRocket,
		title: "Boost Your Flash Services",
		desc: "Turn your points into rewards and premium experiences."
	},
];

const WhyStake = () => {

	return (
		<div id="about" className='relative w-full px-[20px] pt-[80px] lg:pt-[160px]'>
			<img src={ImgBG} className='max-w-full w-[1000px] absolute top-[-20px] left-[50%] -translate-x-1/2 z-10' />
			<div className='max-w-full w-[1440px] mx-auto flex flex-col lg:flex-row-reverse justify-between items-center gap-10'>
				<div className='w-full max-w-[550px] max-h-[512px] flex items-center justify-center z-20'>
					<img src={Img} alt='why stake' className='w-[80%] lg:w-full hover:scale-[105%] transition-all duration-500' />
				</div>
				<div className='w-full flex flex-col gap-[20px] lg:gap-[28px] z-20'>
					<div className='text-[24px] lg:text-[64px] text-start font-[500] h-[40px] lg:h-[100px] mb-[12px] lg:mb-[30px] bg-gradient-to-b from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent'>
						Why Stake on Flash?
					</div>
					{whyStakes.map((item, index) =>
					(
						<>
							<div key={index} className='w-full flex flex-row justify-start items-center gap-4'>
								<div className='w-[40px] lg:w-[60px] h-[40px] lg:h-[60px] bg-[#232323] rounded-full flex justify-center items-center'>
									<img src={item.img} alt='flash' />
								</div>
								<div className='w-[220px] lg:w-auto flex flex-col gap-3' >
									<div className='text-white text-[16px] lg:text-[20px] font-[500]'>{item.title}</div>
									<div className='text-[#B3B3B3] text-[14px] lg:text-[16px] font-[400]'>{item.desc}</div>
								</div>
							</div>
							{index < whyStakes.length - 1 &&
								<div className='w-full h-[1px] bg-gradient-to-r from-[#2A2A2A00] via-[#2A2A2A] via-50% to-[#2A2A2A00]'></div>
							}
						</>
					)
					)}
				</div>
			</div>
		</div>
	);
};

export default WhyStake;
