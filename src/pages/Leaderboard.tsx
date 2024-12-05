//@ts-nocheck
import { useEffect, useState } from "react"

import Icon1 from "../assets/imgs/ranking-1.svg";
import Icon2 from "../assets/imgs/ranking-2.svg";
import Icon3 from "../assets/imgs/ranking-3.svg";
import { numberFormatter } from "../utils/utils";
import { formatAmount, getAllUserStakeInfo } from "../utils/web3-utils";
import { useConnection } from "@solana/wallet-adapter-react";

const styles = [
    { icon: Icon1, bg: 'border-l border-[#ffc000] bg-gradient-to-r from-[rgba(253,183,0,.1)] via-70% via-[#1b1b1ba0] to-[#1b1b1b]' },
    { icon: Icon2, bg: 'border-l border-[#b0c3ed] bg-gradient-to-r from-[rgba(255,254,250,.1)] via-70% via-[#1b1b1ba0] to-[#1b1b1b]' },
    { icon: Icon3, bg: 'border-l border-[#ffb666] bg-gradient-to-r from-[rgba(255,140,78,.1)] via-70% via-[#1b1b1ba0] to-[#1b1b1b]' },
]

export default function Leaderboard() {

    const { connection } = useConnection();
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        if (connection) {
            loadRankings();
        }
    }, [connection]);

    const loadRankings = async () => {
        try {
            let result = await getAllUserStakeInfo(connection);
            const rankings = [];
            for (const item of result) {
                rankings.push({
                    points: formatAmount(item.info.totalDeposit) + formatAmount(item.info.totalRewardDistributed),
                    pubkey: item.pubkey,
                    owner: item.info.owner.toBase58()
                });
            }
            let topRankings = rankings.sort((a, b) => b.points - a.points).slice(0, 10);
            setDataList(topRankings);
        } catch (err) {
            console.log("🚀 ~ loadRankings ~ err:", err)
        }
    }

    return (
        <div className="w-full">
            <div className="text-white text-[20px] font-[500] mb-[24px]">
                Leaderboard
            </div>
            {dataList.map((item, index) => (
                <div key={index}
                    className={
                        `w-full h-[60px] lg:h-[80px] mb-[12px] lg:mb-[16px] rounded-[12px] flex flex-row items-center justify-between 
                        ${index < 3 ? styles[index].bg : 'bg-[#1b1b1b]'}`
                    }
                >
                    <div className="w-[60px] lg:w-[80px] h-full border-r border-[#323232] flex justify-center items-center">
                        {index < 3 ?
                            <img src={styles[index].icon} alt="icon" className="w-[23px] lg:w-auto" />
                            :
                            <div className="bg-[#2a2a2a] w-[28px] lg:w-[36px] h-[28px] lg:h-[36px] rounded-full flex justify-center items-center text-[#656565] text-[12px] lg:text-[16px] font-[500]">
                                {index + 1}
                            </div>
                        }
                    </div>
                    <div className="flex-grow flex flex-row justify-between pl-[16px] lg:pl-[46px] pr-[16px] lg:pr-[20px]">
                        <div className="text-white text-[14px] lg:text-[16px] font-[500] w-[180px] md:w-auto truncate">{item.owner}</div>
                        <div className="text-white text-[14px] lg:text-[18px] font-[500]">{numberFormatter(item.points)}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}