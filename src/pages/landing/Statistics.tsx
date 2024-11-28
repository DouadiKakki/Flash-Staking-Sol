//@ts-nocheck

import React from 'react';


const cards = [
	{
		title: "Points Generated",
		desc: "456,569+"
	},
	{
		title: "Average Fee Reduction",
		desc: "50%"
	},
	{
		title: "Users with 100% Fee Reduction",
		desc: "3,500+"
	},
	{
		title: "Average APY",
		desc: "27.23%"
	},
];

const Statistics = () => {

	return (
		<div id="statistics" className='w-full px-[20px] pt-[80px] lg:pt-[160px]' style={{ background: "url(/imgs/bg-grid2.png) center top no-repeat" }}>
			<div className='max-w-full w-[1440px] mx-auto flex flex-col justify-center items-center gap-4'>
				<div className='text-[24px] lg:text-[64px] text-center font-[500] h-[40px] lg:h-[100px] bg-gradient-to-b from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent'>
					Live Statistics
				</div>
				<div className='text-[16px] lg:text-[18px] text-center font-[400] text-[#B3B3B3] lg:leading-[30px] max-w-[560px]'>
					Stay updated with real-time insights showcasing the impact of staking on our growing community.
				</div>
				<div className='flex flex-row flex-wrap justify-center items-center gap-[40px] mt-0 lg:mt-[30px]'>
					{cards.map((item, index) =>
					(
						<div key={index} className='relative w-[330px] h-[154px] p-[2px] bg-gradient-to-b from-[rgba(73,73,73,0.5)] to-[rgba(73,73,73,0)] rounded-[16px] hover:scale-110 transition-all duration-500'>
							<div className='relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[rgba(30,30,30,1)] to-[rgba(21,21,21,1)] rounded-[16px]'>
								<div className='text-[#B3B3B3] text-center text-[16px] font-[400]'>{item.title}</div>
								<div className='text-white text-center text-[40px] mt-[10px]'>{item.desc}</div>
							</div>
						</div>
					)
					)}
				</div>
			</div>
		</div>
	);
};

export default Statistics;
