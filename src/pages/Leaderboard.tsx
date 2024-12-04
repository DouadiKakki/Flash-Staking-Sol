//@ts-nocheck
import { useEffect, useState } from "react"

import Icon1 from "../assets/imgs/ranking-1.svg";
import Icon2 from "../assets/imgs/ranking-2.svg";
import Icon3 from "../assets/imgs/ranking-3.svg";
import { numberFormatter } from "../utils/utils";

const styles = [
    { icon: Icon1, bg: 'border-l border-[#ffc000] bg-gradient-to-r from-[rgba(253,183,0,.1)] via-70% via-[#1b1b1ba0] to-[#1b1b1b]' },
    { icon: Icon2, bg: 'border-l border-[#b0c3ed] bg-gradient-to-r from-[rgba(255,254,250,.1)] via-70% via-[#1b1b1ba0] to-[#1b1b1b]' },
    { icon: Icon3, bg: 'border-l border-[#ffb666] bg-gradient-to-r from-[rgba(255,140,78,.1)] via-70% via-[#1b1b1ba0] to-[#1b1b1b]' },
]

const _tempData = [
    { ranking: 1, address: 'HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa', points: 5000 },
    { ranking: 2, address: 'HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa', points: 4000 },
    { ranking: 3, address: 'HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa', points: 3000 },
    { ranking: 4, address: 'HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa', points: 2000 },
    { ranking: 5, address: 'HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa', points: 1000 },
    { ranking: 6, address: 'HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa', points: 900 },
    { ranking: 7, address: 'HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa', points: 800 },
    { ranking: 8, address: 'HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa', points: 600 },
    { ranking: 9, address: 'HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa', points: 500 },
    { ranking: 10, address: 'HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa', points: 100 },
];

export default function Leaderboard() {

    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        setDataList(_tempData);
    }, []);

    return (
        <div className="w-full">
            <div className="text-white text-[20px] font-[500] mb-[24px]">
                Leaderboard
            </div>
            {dataList.map((item, index) => (
                <div key={index}
                    className={
                        `w-full h-[60px] lg:h-[80px] mb-[12px] lg:mb-[16px] rounded-[12px] flex flex-row items-center justify-between 
                        ${item.ranking < 4 ? styles[item.ranking - 1].bg : 'bg-[#1b1b1b]'}`
                    }
                >
                    <div className="w-[60px] lg:w-[80px] h-full border-r border-[#323232] flex justify-center items-center">
                        {item.ranking < 4 ?
                            <img src={styles[item.ranking - 1].icon} alt="icon" className="w-[23px] lg:w-auto" />
                            :
                            <div className="bg-[#2a2a2a] w-[28px] lg:w-[36px] h-[28px] lg:h-[36px] rounded-full flex justify-center items-center text-[#656565] text-[12px] lg:text-[16px] font-[500]">
                                {item.ranking}
                            </div>
                        }
                    </div>
                    <div className="flex-grow flex flex-row justify-between pl-[16px] lg:pl-[46px] pr-[16px] lg:pr-[20px]">
                        <div className="text-white text-[14px] lg:text-[16px] font-[500] w-[180px] md:w-auto truncate">{item.address}</div>
                        <div className="text-white text-[14px] lg:text-[18px] font-[500]">{numberFormatter(item.points)}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}