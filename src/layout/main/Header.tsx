//@ts-nocheck

import React from "react";

import ImgHamburger from "../../assets/imgs/hamburger.svg";
import ImgLogout from "../../assets/imgs/icon-logout.svg";

import { useNavigate } from "react-router-dom";
import { getTrimedAddress } from "../../utils/utils";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import { useWallet } from "@solana/wallet-adapter-react";

import "./custom.css";

const Header = (props: any) => {

    const navigate = useNavigate();
    const { connected, publicKey, disconnect } = useWallet();

    return (
        <>
            <div className="w-full h-[72px] px-[20px] lg:px-[32px] bg-[#181818] border-b border-[#2e2e2e] flex items-center justify-between">
                <div className="flex items-center" onClick={() => navigate("/")}>
                    <img className="w-[46px] h-[46px] lg:hidden" src="/logo.png" alt="Logo" />
                </div>
                <div className="flex justify-center items-center gap-3">
                    {connected ?
                        <>
                            <div className="wallet-connected">
                                <WalletMultiButton />
                            </div>
                            <div className="w-[40px] h-[40px] bg-[#131313] border border-[#2e2e2e] hover:bg-[#2c2c2c] rounded-[44px] flex items-center justify-center cursor-pointer" onClick={() => disconnect()}>
                                <img src={ImgLogout} className="" alt="logout" />
                            </div>
                        </>
                        :
                        <WalletMultiButton />
                    }
                    <div className="w-[44px] h-[44px] bg-[#2a2a2a] rounded-full lg:hidden flex justify-center items-center cursor-pointer" onClick={() => props.onMenuClick()}>
                        <img src={ImgHamburger} className="" alt="menu" />
                    </div>
                </div>
            </div >
        </>
    );
};

export default Header;
