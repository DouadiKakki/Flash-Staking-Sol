import axios from "axios";

export const USDT_ADDRESS = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
export const USDT_DECIMAL = 6;

export const FLASH_ADDRESS = "3p495oCmC4jsBrdLLny7Qm77mM62rUnQAgaBT6qNVTvg";
export const FLASH_DECIMAL = 6;

// devnet - USD Coin Dev: 
export const USDC_ADDRESS = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
export const USDC_DECIMAL = 6;


export const STAKING_PROGRAM_ID = 'AJh1PBLUDwUxUqSj6Qrx8L543Jfu9LkKPVxFqJF4ov4z';
export const STAKING_POOL_PUBKEY = 'AgKsQDsTFxNj8zUph5YAPopEsqYt1gTUVdrmqqxZdfXC';


export const getTokenRates = async () => {
    try {
        // const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=SOL&convert=USD`, {
        //     headers: {
        //         'Content-Type': "application/json",
        //         'X-CMC_PRO_API_KEY': process.env.REACT_APP_COIN_MAKET_API
        //     }
        // });
        // const prices = response.data.data;
        // const price = prices.SOL.quote.USD.price;
        // const percent = prices.SOL.quote.USD.percent_change_24h;


        const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=solana,binance-bridged-usdt-bnb-smart-chain,flash-protocol&include_24hr_change=true&vs_currencies=usd", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return {
            SOL: { 
                price: response.data.solana.usd, 
                percent: response.data.solana.usd_24h_change
            },
            USDT: { 
                price: response.data["binance-bridged-usdt-bnb-smart-chain"].usd, 
                percent: response.data["binance-bridged-usdt-bnb-smart-chain"].usd_24h_change
            },
            Flash: { 
                price: response.data["flash-protocol"].usd, 
                percent: response.data["flash-protocol"].usd_24h_change
            },
        }
    } catch (error: any) {
        return null;
    }
}

