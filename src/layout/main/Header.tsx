//@ts-nocheck

import React from "react";

import ImgHamburger from "../../assets/imgs/hamburger.svg";
import ImgLogout from "../../assets/imgs/icon-logout.svg";

import { useNavigate } from "react-router-dom";
import { getTrimedAddress } from "../../utils/utils";

const Header = (props: any) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="w-full h-[72px] px-[20px] lg:px-[32px] bg-[#181818] border-b border-[#2e2e2e] flex items-center justify-between">
                <div className="flex items-center" onClick={() => navigate("/")}>
                    <img className="w-[46px] h-[46px] lg:hidden" src="/logo.png" alt="Logo" />
                </div>
                <div className="flex justify-center items-center gap-3">
                    <div className="text-[#101010] font-semibold text-[14px] h-[40px] bg-[#FFC000] hover:bg-[#e7dc3c] border border-[#2e2e2e] rounded-[44px] px-[20px] flex items-center cursor-pointer">
                        Connect Wallet
                    </div>
                    <div className="text-white text-[14px] h-[40px] bg-[#131313] hover:bg-[#2c2c2c] border border-[#2e2e2e] rounded-[44px] px-[20px] flex items-center cursor-pointer">
                        {getTrimedAddress('HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa')}
                    </div>
                    <div className="w-[40px] h-[40px] bg-[#131313] border border-[#2e2e2e] hover:bg-[#2c2c2c] rounded-[44px] flex items-center justify-center cursor-pointer">
                        <img src={ImgLogout} className="" alt="logout" />
                    </div>
                    <div className="w-[44px] h-[44px] bg-[#2a2a2a] rounded-full lg:hidden flex justify-center items-center cursor-pointer" onClick={() => props.onMenuClick()}>
                        <img src={ImgHamburger} className="" alt="menu" />
                    </div>
                </div>
            </div >
        </>
    );
};

export default Header;
