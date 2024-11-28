//@ts-nocheck

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Img1 from "../../assets/imgs/partners/binance.png";
import Img2 from "../../assets/imgs/partners/coinbase.png";
import Img3 from "../../assets/imgs/partners/microsoft.png";
import Img4 from "../../assets/imgs/partners/dexscreener.png";
import Img5 from "../../assets/imgs/partners/ledger.png";
import Img6 from "../../assets/imgs/partners/onramper.png";
import Img7 from "../../assets/imgs/partners/coinmarketcap.png";
import Img8 from "../../assets/imgs/partners/coingecko.png";
import { useMediaQuery } from 'react-responsive';

const partners = [
	{
		img: Img1,
		name: 'Binance',
	},
	{
		img: Img2,
		name: 'Coinbase',
	},
	{
		img: Img3,
		name: 'Microsoft',
	},
	{
		img: Img4,
		name: 'DEXSCREENER',
	},
	{
		img: Img5,
		name: 'Ledger',
	},
	{
		img: Img6,
		name: 'OnRamper',
	},
	{
		img: Img7,
		name: 'CoinMarketCap',
	},
	{
		img: Img8,
		name: 'Coingecko',
	},
];

const Partners = () => {
	const isMobile = useMediaQuery({ maxWidth: 768 });

	return (
		<div id="partners" className='w-full px-[20px] mt-[60px] lg:mt-[200px]'>
			<div className='relative max-w-full w-[1440px] h-[36px] lg:h-[128px] mx-auto py-[2px] bg-gradient-to-r from-[#141414] via-[#2b2b2b] via-50% to-[#141414]'>
				<div className='relative w-full h-full bg-[#191919] flex items-center z-20'>
					<Swiper
						className="w-full h-[16px] lg:h-[60px] z-20"
						spaceBetween={isMobile ? 30 : 100}
						slidesPerView={'auto'}
						loop={true}
						modules={[Autoplay]}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
					>
						{partners.map((item, index) =>
							<SwiperSlide key={index} className='max-w-[60px] lg:max-w-[220px]'>
								<div className='w-[60px] lg:w-[220px] h-[15px] lg:h-[60px] flex justify-center items-center z-20'>
									<img src={item.img} alt={item.name} className='cursor-pointer hover:scale-125 transition-all duration-500' />
								</div>
							</SwiperSlide>
						)}
					</Swiper>
					<div className='absolute h-full w-[50px] lg:w-[150px] z-10 top-0 left-0 bg-gradient-to-r from-[#111111] from-10% to-transparent'></div>
					<div className='absolute h-full w-[50px] lg:w-[150px] z-10 top-0 right-0 bg-gradient-to-l from-[#111111] from-10% to-transparent'></div>
				</div>
			</div>
		</div>
	);
};

export default Partners;
