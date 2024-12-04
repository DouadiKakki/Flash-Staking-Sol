//@ts-nocheck

import React from 'react';


import Icon1 from "../../assets/imgs/client-1.png";
import Icon2 from "../../assets/imgs/client-2.png";
import IconButton from '../../components/IconButton';
import { useNavigate } from 'react-router-dom';
import { scrollTo } from '../../utils/animateScroll';

const cards = [
	{
		img: Icon1,
		title: "Wade Warren",
		desc: '"Thanks to staking, I reduced my fees to zero in less than a month!"'
	},
	{
		img: Icon2,
		title: "Cameron Williamson",
		desc: '"The exclusive airdrops for staking users are a real game-changer for my strategy."'
	},
];

const Testimonials = () => {

	const navigate = useNavigate();

	return (
		<div id="statistics" className='w-full px-[20px] pt-[80px] lg:pt-[160px]'>
			<div className='max-w-full w-[1440px] mx-auto flex flex-col justify-center items-center gap-4'>
				<div className='w-full text-[24px] lg:text-[64px] text-start font-[500] h-[40px] lg:h-[100px] bg-gradient-to-b from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent'>
					Client Testimonials
				</div>
				<div className='w-full text-[16px] lg:text-[18px] text-start font-[400] text-[#B3B3B3] lg:leading-[30px]'>
					Hear from our satisfied users who have transformed their experience with Flash staking.
				</div>
				<div className='flex flex-row flex-wrap justify-center items-center gap-[30px] lg:gap-[40px] mt-[10px] lg:mt-[30px]'>
					{cards.map((item, index) =>
					(
						<div key={index} className='relative w-[335px] lg:w-[700px] h-[157px] lg:h-[328px] p-[2px] bg-gradient-to-b from-[rgba(73,73,73,0.5)] to-[rgba(73,73,73,0)] rounded-[16px] hover:scale-110 transition-all duration-500'>
							<div className='relative w-full h-full flex flex-col px-[34px] lg:px-[70px] justify-center items-center overflow-hidden bg-gradient-to-b from-[rgba(30,30,30,1)] to-[rgba(21,21,21,1)] rounded-[16px]'>
								<img src={item.img} className='w-[38px] lg:w-[80px] h-[38px] lg:h-[80px]' alt="client" />
								<div className='text-[#B3B3B3] text-center text-[9px] lg:text-[18px] font-[400] mt-[8px] lg:mt-[17px]'>{item.title}</div>
								<div className='text-white text-center text-[14px] lg:text-[30px] mt-[12px] lg:mt-[20px]'>{item.desc}</div>
							</div>
						</div>
					)
					)}
				</div>
			</div>

			<div className='max-w-full w-[1440px] mx-auto flex flex-col justify-center items-center mt-[90px] lg:mt-[170px] bg-gradient-to-b from-[rgba(254,199,1,1)] to-[rgba(254,149,1,1)] rounded-[16px] lg:rounded-[20px] py-[27px] lg:py-[122px] px-[40px] lg:px-[160px]'>
				<div className='text-[24px] lg:text-[65px] font-[500] text-[rgba(43,39,33,1)] text-center'>Get up to 100% off</div>
				<div className='max-w-full w-[1000px] text-[16px] lg:text-[51px] font-[400] text-[rgba(43,39,33,1)] text-center mt-2 leading-[25px] lg:leading-[56px]'>
					Your fees and unlock exclusive perks by staking your crypto today!
				</div>
				<div className='w-full flex flex-col lg:flex-row justify-center items-center gap-5 mt-[24px] lg:mt-[32px]'>
					<IconButton
						text='Start Staking'
						className='w-full lg:w-[182px]'
						BgClass='bg-[rgba(29,25,18,1)]'
						BgHoverClass="hover:bg-[rgba(99,25,18,1)]"
						TxClass='text-[rgba(255,192,0,1)]'
						onClick={() => navigate("/main/staking")}
					/>
					<IconButton
						text='Discover the Bonuses'
						className='w-full lg:w-[260px]'
						BgClass='bg-transparent border border-[rgba(29,25,18,1)]'
						onClick={() => scrollTo({ id: "benefits" })}
					/>
				</div>
			</div>
		</div>
	);
};

export default Testimonials;
