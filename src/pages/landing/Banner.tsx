//@ts-nocheck

import React from 'react';

import ImgStaking from "../../assets/imgs/Staking.png";
import IconButton from '../../components/IconButton';
import IconButton2 from '../../components/IconButton2';
import { useNavigate } from 'react-router-dom';
import { scrollTo } from '../../utils/animateScroll';

const Banner = () => {
	const navigate = useNavigate();

	return (
		<div id="home" className='w-full pt-[130px] lg:pt-[260px] flex flex-col items-center px-[20px]' style={{ background: "url(/imgs/bg-grid1.png) center top" }}>
			<div className='w-full flex flex-col items-center z-10'>
				<div className='text-[32px] lg:text-[80px] text-center font-[500] lg:min-h-[200px] lg:leading-[92px] bg-gradient-to-b from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent'>
					Earn points and<br />enjoy unbeatable discounts!
				</div>
				<div className='text-[16px] lg:text-[20px] text-center font-[400] text-[#B3B3B3] mt-[12px] lg:mt-[10px] lg:leading-[30px] max-w-[787px] px-[10px]'>
					Stake your FLASH tokens to generate points, unlock exclusive bonuses, and get up to 100% off your transaction fees
				</div>
				<div className='mt-[47px] lg:mt-[20px] w-full flex flex-col justify-center md:flex-row gap-5'>
					<IconButton
						text='Start Staking'
						className='w-full md:w-[182px]'
						onClick={() => navigate("/main/staking")}
					/>
					<IconButton2
						text='Discover the Bonuses'
						className='w-full md:w-[260px]'
						onClick={() => scrollTo({ id: "benefits" })}
					/>
				</div>
			</div>
			<div className='w-full mt-[43px] lg:mt-[60px] z-10'>
				<img src={ImgStaking} alt="banner" className='max-w-full w-[1150px] mx-auto hover:scale-[101%] transition-all duration-500' />
			</div>
		</div>
	);
};

export default Banner;
