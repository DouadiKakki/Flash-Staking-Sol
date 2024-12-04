import React, { useMemo } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import LandingLayout from "../layout/landing/LandingLayout";
import MainLayout from "../layout/main/MainLayout";

import Landing from "../pages/Landing";
import Staking from "../pages/Staking";
import Leaderboard from "../pages/Leaderboard";

export default function Router() {

    const endpoint = clusterApiUrl("devnet");
    const wallets = useMemo(() => [], []);


    return (
        <>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets}>
                    <WalletModalProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<LandingLayout />}>
                                    <Route path="/" element={<Landing />} />
                                    <Route path="/home" element={<Landing />} />
                                </Route>
                            </Routes>
                            <Routes>
                                <Route path="/main" element={<MainLayout />}>
                                    <Route path="staking" element={<Staking />} />
                                    <Route path="leaderboard" element={<Leaderboard />} />
                                </Route>
                            </Routes>
                            <ToastContainer autoClose={2000} position="top-right" />
                        </BrowserRouter>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </>
    )
}