//@ts-nocheck

import React from 'react';

import Icon1 from "../../assets/imgs/icon-reduction.png";
import Icon2 from "../../assets/imgs/icon-airdrop.png";
import Icon3 from "../../assets/imgs/icon-boost.png";
import Icon4 from "../../assets/imgs/icon-leaderboard.png";
import Img from "../../assets/imgs/img-2.png";
import BgCard from "../../assets/imgs/bg-card2.png";

const cards = [
	{
		img: Icon1,
		title: "Fee Reductions",
		desc: "Up to 100% off transaction fees."
	},
	{
		img: Icon2,
		title: "Exclusive Airdrops",
		desc: "Rewards for staking users."
	},
	{
		img: Icon3,
		title: "Loyalty Boost",
		desc: "Access VIP perks on Flash Transfer and Flash Wallet."
	},
	{
		img: Icon4,
		title: "Leaderboard System",
		desc: "Level up faster and gain higher rewards with Ranking Increase NFTs."
	},
];

const Benefits = () => {

	return (
		<div id="benefits" className='relative w-full px-[20px] pt-[80px] lg:pt-[150px]'>
			<div className='max-w-full w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-20'>
				<div className='w-full lg:w-[40%] max-w-[550px] max-h-[512px] flex items-center justify-center'>
					<img src={Img} alt='benefits' className='w-[90%] lg:w-full hover:scale-[105%] transition-all duration-500' />
				</div>
				<div className='w-full lg:w-[60%] flex flex-col'>
					<div className='text-[24px] lg:text-[64px] text-start font-[500] h-[40px] lg:h-[100px] lg:mb-[10px] bg-gradient-to-b from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent'>
						Maximize Your Benefits
					</div>
					<div className='text-[16px] lg:text-[18px] text-start font-[400] text-[#B3B3B3] lg:leading-[30px] max-w-[717px] mb-[32px] lg:mb-[54px] '>
						Unlock unparalleled rewards and elevate your experience with exclusive benefits designed just for stakers.
					</div>
					<div className='flex flex-row flex-wrap justify-center lg:justify-start items-center gap-[30px]'>
						{cards.map((item, index) =>
						(
							<div key={index} className='relative w-[335px] h-[225px] p-[2px] bg-gradient-to-b from-[rgba(73,73,73,0.5)] to-[rgba(73,73,73,0)] rounded-[16px] hover:scale-110 transition-all duration-500'>
								<div className='relative w-full h-full p-[24px] flex flex-col justify-start items-start overflow-hidden bg-gradient-to-b from-[rgba(30,30,30,1)] to-[rgba(21,21,21,1)] rounded-[16px]'>
									<img src={BgCard} className='w-[409px] absolute top-0 right-0 z-10' />
									<img src={item.img} className='w-[64px] h-[64px] z-20' alt='flash' />
									<div className='text-white text-center text-[20px] mt-[20px] z-20'>{item.title}</div>
									<div className='text-[#B3B3B3] text-center text-[16px] font-[400] mt-[16px] z-20'>{item.desc}</div>
								</div>
							</div>
						)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Benefits;
