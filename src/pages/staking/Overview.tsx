//@ts-nocheck

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Icon1 from "../../assets/imgs/totals.svg";
import Icon2 from "../../assets/imgs/points.svg";
import Icon3 from "../../assets/imgs/apyrate.svg";
import Icon4 from "../../assets/imgs/stakers.svg";
import Icon5 from "../../assets/imgs/nft-bonus.svg";

import IconUp from "../../assets/imgs/go-up.svg";
import IconDown from "../../assets/imgs/go-down.svg";
import { numberFormatter } from '../../utils/utils';
import { useMediaQuery } from 'react-responsive';

const cards = [
	{
		img: Icon1,
		title: "Total Value Locked",
		value: 957420,
		prefix: "$",
		inc: 30
	},
	{
		img: Icon2,
		title: "Points Generated",
		value: 456569.02,
		inc: -30
	},
	{
		img: Icon3,
		title: "APY Rate",
		value: 97.23,
		suffix: "%",
		inc: -30,
	},
	{
		img: Icon4,
		title: "Stakers",
		value: 6997,
		inc: 30,
	},
	{
		img: Icon5,
		title: "NFT Bonus",
		value: 69,
		suffix: "%",
		inc: 30,
	},
];

const Overview = () => {

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

	const renderCard = (item, index) => {
		return (
			<div key={index} className='w-full h-[168px] bg-[#1b1b1b] rounded-[12px] flex flex-col justify-start items-start px-[16px] py-[20px] mb-[24px] md:mb-0'>
				<div className='flex flex-row items-center gap-[9px]'>
					<img src={item.img} className='w-[36px] h-[36px]' alt='flash' />
					<div className='text-white text-[14px] font-[500]'>{item.title}</div>
				</div>
				<div className='text-white text-[28px] font-[400] mt-[20px]'>
					{item.prefix || ""}{numberFormatter(item.value)}{item.suffix || ""}
				</div>
				<div className='text-[#B3B3B3] text-[14px] font-[400] mt-[10px] flex flex-row items-center gap-[10px]'>
					<img src={item.inc > 0 ? IconUp : IconDown} alt='diff' />
					{Math.abs(item.inc)}% Last Week
				</div>
			</div>
		);
	}

	return (
		<div className='w-full flex flex-row flex-wrap justify-center items-center staking-overview'>
			{isTabletOrMobile ?
				(
					cards.map((item, index) =>
						renderCard(item, index)
					)
				) :
				(
					<Swiper
						className="w-full"
						spaceBetween={24}
						slidesPerView={'auto'}
						loop={false}
						navigation={true}
						modules={[Autoplay, Navigation]}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
					>
						{cards.map((item, index) =>
							<SwiperSlide key={index} className='max-w-[290px]'>
								{renderCard(item, index)}
							</SwiperSlide>
						)}
					</Swiper>
				)
			}
		</div >
	);
};

export default Overview;
