//@ts-nocheck

import React, { useEffect, useState } from 'react';

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
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { STAKING_POOL_PUBKEY, STAKING_PROGRAM_ID } from '../../utils/web3-utils';
import { PublicKey } from '@solana/web3.js';
import * as borsh from '@coral-xyz/borsh'
import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor';

import idl from "../../idl/flash_staking_solana.json";
import type { FlashStakingSolana } from "../../idl/flash_staking_solana";

// const PoolInfoSchema = borsh.struct([
// 	borsh.u64('info'),
// 	borsh.publicKey('owner'),
// 	borsh.u64('totalStaked'),
// 	borsh.u64('totalStakers'),
// 	borsh.u64('totalRewardDistributed'),
// 	borsh.u8('bump'),
// ])

const _cards = [
	{
		img: Icon1,
		title: "Total Value Locked",
		value: 0,
		prefix: "$",
		inc: 0
	},
	{
		img: Icon2,
		title: "Points Generated",
		value: 0,
		inc: 0
	},
	{
		img: Icon3,
		title: "APY Rate",
		value: 0,
		suffix: "%",
		inc: 0,
	},
	{
		img: Icon4,
		title: "Stakers",
		value: 0,
		inc: 0,
	},
	{
		img: Icon5,
		title: "NFT Bonus",
		value: 0,
		suffix: "%",
		inc: 0,
	},
];

const Overview = () => {

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

	const { connection } = useConnection();
	const { connected, publicKey, sendTransaction } = useWallet();
	const wallet = useAnchorWallet();
	const provider = new AnchorProvider(connection, wallet, {
		commitment: "confirmed",
	});
	setProvider(provider);

	const [cards, setCards] = useState(_cards);

	useEffect(() => {
		getOverviews();
	}, []);

	const getOverviews = async () => {
		try {

			const program = new Program(idl as FlashStakingSolana);

			const poolInfo = await program.account.poolInfo.fetch(STAKING_POOL_PUBKEY);
			console.log(poolInfo);

			// await program.methods
			// 	.instructionName(instructionDataInputs)
			// 	.accounts({})
			// 	.signers([])
			// 	.rpc();

			// const accounts = await connection.getParsedProgramAccounts(
			// 	new PublicKey(STAKING_PROGRAM_ID)
			// );
			// console.log("🚀 ~ getOverviews ~ accounts:", accounts)
			// console.log("🚀 ~ getOverviews ~ accounts:", accounts[0].pubkey.toBase58())
			// let data = PoolInfoSchema.decode(accounts[0].account.data);

			// console.log("🚀 ~ getOverviews ~ accounts:", data)

			const newCards = [..._cards];

			newCards[0].value = poolInfo.totalStaked;
			newCards[1].value = poolInfo.totalRewardDistributed;
			newCards[2].value = 3;
			newCards[3].value = poolInfo.totalStakers;

			setCards(newCards);
		} catch (err) {
			console.log("🚀 ~ getOverviews ~ err:", err)
		}
	}

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
					<img src={item.inc >= 0 ? IconUp : IconDown} alt='diff' />
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
