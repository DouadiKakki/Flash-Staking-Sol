import React, { useMemo } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, TorusWalletAdapter, TrustWalletAdapter, WalletConnectWalletAdapter } from '@solana/wallet-adapter-wallets';

import LandingLayout from "../layout/landing/LandingLayout";
import MainLayout from "../layout/main/MainLayout";

import Landing from "../pages/Landing";
import Staking from "../pages/Staking";
import Leaderboard from "../pages/Leaderboard";

export default function Router() {

    const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet);
    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new TrustWalletAdapter(),
        new TorusWalletAdapter(),
        new WalletConnectWalletAdapter({
            network: WalletAdapterNetwork.Devnet,
            options: {
                relayUrl: 'wss://relay.walletconnect.com',
                // relayUrl: 'https://relay.walletconnect.org',
                // example WC app project ID
                projectId: 'e899c82be21d4acca2c8aec45e893598',
                metadata: {
                    name: 'FlashWallet',
                    description: 'FlashWallet',
                    url: 'https://github.com/solana-labs/wallet-adapter',
                    icons: ['https://avatars.githubusercontent.com/u/35608259?s=200'],
                },

            }
        })
    ], []);


    return (
        <>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
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