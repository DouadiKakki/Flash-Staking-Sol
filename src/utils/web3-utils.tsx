//@ts-nocheck
import { Buffer } from "buffer";
import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, Program, setProvider, BorshAccountsCoder } from "@coral-xyz/anchor";
import { Account, TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../idl/flash_staking_solana.json";

window.Buffer = window.Buffer || Buffer;


export const USDT_ADDRESS = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
export const USDT_DECIMAL = 6;

// export const FLASH_ADDRESS = "3p495oCmC4jsBrdLLny7Qm77mM62rUnQAgaBT6qNVTvg";
// export const FLASH_DECIMAL = 6;
export const FLASH_ADDRESS = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";       // devnet - USD Coin Dev: 
export const FLASH_DECIMAL = 6;

const STAKING_PROGRAM_ID = '6SXskVfpFBaX8kjKNZmvJeZtrTsWgYpQp7p2TyqVWtZH';

const POOL_INFO_SEED = "flash_info";
const POOL_VAULT_SEED = "flash_pool_vault";
const USER_INFO_SEED = "flash_stake";

export const flashToken = new PublicKey(FLASH_ADDRESS);
export const companyWallet = new PublicKey("HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa");

let StakingProgram = null;

export const initAnchorProvider = (connection: any, wallet: any) => {
    const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
    });
    setProvider(provider);

    // if (!StakingProgram) {
        StakingProgram = new Program(idl, STAKING_PROGRAM_ID);
    // }
}

export const getOrCreateTokenVault = async (
    connection: Connection,
    owner: PublicKey,
    payer: any,
    isPDA: boolean = false
): Promise<Account> => {
    // Get or create the account for token of type mint for owner
    return await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        flashToken,
        owner,
        isPDA
    );
};

export const findProgramAddress = async (seeds: any) => {
    const [pda, bump] = PublicKey.findProgramAddressSync(
        seeds,
        StakingProgram.programId
    );
    return pda;
}

export const getStakingPoolPDA = async () => {
    return await findProgramAddress([Buffer.from(POOL_INFO_SEED)]);
}
export const getStakingPoolVaultPDA = async () => {
    return await findProgramAddress([Buffer.from(POOL_VAULT_SEED), flashToken.toBuffer()]);
}
export const getStakingUserInfoPDA = async (publicKey: PublicKey) => {
    return await findProgramAddress([Buffer.from(USER_INFO_SEED), publicKey.toBuffer()]);
}

export const formatAmount = (amount) => {
    return Number(amount) / Math.pow(10, FLASH_DECIMAL);
}
export const parseAmount = (amount) => {
    return Number(amount) * Math.pow(10, FLASH_DECIMAL);
}

export const getPoolInfo = async () => {
    try {
        const poolInfoPDA = await getStakingPoolPDA();
        const poolInfo = await StakingProgram.account.poolInfo.fetch(poolInfoPDA);
        // console.log(poolInfo);

        poolInfo.totalStaked = formatAmount(poolInfo.totalStaked);
        poolInfo.totalRewardDistributed = formatAmount(poolInfo.totalRewardDistributed);
        poolInfo.totalStakers = Number(poolInfo.totalStakers);
        return poolInfo;
    } catch (err) {
        console.log("🚀 ~ getPoolInfo ~ err:", err)
    }
    return null;
}

export const getUserStakeInfo = async (publicKey: PublicKey) => {
    try {
        const userInfoPDA = await getStakingUserInfoPDA(publicKey);
        const userInfo = await StakingProgram.account.userInfo.fetch(userInfoPDA);
        console.log(userInfo);
        return userInfo;
    } catch (err) {
        console.log("🚀 ~ getUserInfo ~ err:", err)
    }
    return null;
}

export const getAllUserStakeInfo = async (connection) => {
    try {
        const accounts = await connection.getParsedProgramAccounts(new PublicKey(STAKING_PROGRAM_ID));

        let coder = new BorshAccountsCoder(idl);
        const userStakingInfos = [];
        for (const account of accounts) {
            try {
                let result = coder.decode("UserInfo", account.account.data);
                userStakingInfos.push({
                    pubkey: account.pubkey,
                    info: result
                });
            } catch (e) { }
        }
        return userStakingInfos;
    } catch (err) {
        console.log("🚀 ~ getAllUserStakeInfo ~ err:", err)
    }
    return null;
}


export const deposit = async (connection, userWalletPublicKey, amount) => {

    try {
        const fundAmount = parseAmount(amount);

        const poolInfoPDA = await getStakingPoolPDA();
        const poolTokenVault = await getStakingPoolVaultPDA();

        const userTokenVault = await getOrCreateTokenVault(connection, userWalletPublicKey);

        const tx = await StakingProgram.methods
            .fund(new anchor.BN(fundAmount))
            .accounts({
                poolInfo: poolInfoPDA,
                funder: userWalletPublicKey,
                funderVault: userTokenVault.address,
                tokenVault: poolTokenVault,
                tokenMint: flashToken,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .rpc();
        return tx;

    } catch (err) {
        console.log("🚀 ~ stake ~ err:", err)
    }
    return null;
}

export const stake = async (connection, userWalletPublicKey, amount, period, percent) => {

    try {
        const stakeAmount = parseAmount(amount);

        const poolInfoPDA = await getStakingPoolPDA();
        const poolTokenVault = await getStakingPoolVaultPDA();
        const companyTokenVault = await getOrCreateTokenVault(connection, companyWallet);

        const userInfoPDA = await getStakingUserInfoPDA(userWalletPublicKey);
        const userTokenVault = await getOrCreateTokenVault(connection, userWalletPublicKey);

        const tx = await StakingProgram.methods
            .stake(new anchor.BN(stakeAmount), new anchor.BN(period), new anchor.BN(percent))
            .accounts({
                poolInfo: poolInfoPDA,
                user: userWalletPublicKey,
                userInfo: userInfoPDA,
                userVault: userTokenVault.address,
                tokenVault: poolTokenVault,
                tokenMint: flashToken,
                companyVault: companyTokenVault.address,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY
            })
            .rpc();
        return tx;

    } catch (err) {
        console.log("🚀 ~ stake ~ err:", err)
    }
    return null;
}

export const unstake = async (connection, userWalletPublicKey, stakeId) => {

    try {
        const poolInfoPDA = await getStakingPoolPDA();
        const poolTokenVault = await getStakingPoolVaultPDA();
        const companyTokenVault = await getOrCreateTokenVault(connection, companyWallet);

        const userInfoPDA = await getStakingUserInfoPDA(userWalletPublicKey);
        const userTokenVault = await getOrCreateTokenVault(connection, userWalletPublicKey);

        const tx = await StakingProgram.methods
            .unstake(stakeId)
            .accounts({
                poolInfo: poolInfoPDA,
                user: userWalletPublicKey,
                userInfo: userInfoPDA,
                userVault: userTokenVault.address,
                tokenVault: poolTokenVault,
                tokenMint: flashToken,
                companyVault: companyTokenVault.address,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .rpc();
        return tx;

    } catch (err) {
        console.log("🚀 ~ unstake ~ err:", err)
    }
    return null;
}


