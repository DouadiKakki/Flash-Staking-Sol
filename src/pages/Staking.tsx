import Graphs from "./staking/Graphs";
import LockPeriod from "./staking/LockPeriod";
import Overview from "./staking/Overview";
import Stakes from "./staking/Stakes";
import TokenRate from "./staking/TokenRate";

export default function Staking() {
    return (
        <div className="w-full flex flex-col gap-[24px]">
            <Overview />
            <div className="w-full flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-1/2 pr-0 lg:pr-[12px] mb-[40px] lg:mb-0">
                    <LockPeriod />
                </div>
                <div className="w-full lg:w-1/2 pl-0 lg:pl-[12px] mb-[20px] lg:mb-0">
                    <Graphs />
                </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-1/2 pr-0 lg:pr-[12px] mb-[40px] lg:mb-0">
                    <Stakes />
                </div>
                <div className="w-full lg:w-1/2 pl-0 lg:pl-[12px] mb-[20px] lg:mb-0">
                    <TokenRate />
                </div>
            </div>
        </div>
    )
}