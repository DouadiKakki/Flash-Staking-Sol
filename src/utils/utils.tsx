import format from "format-number";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";

export const isValidateEmail = (email: any) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const showConfirmBox = (title: any, text: any, callback: Function) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: title,
        text: text,
        showCancelButton: true,
        confirmButtonColor: "#44972a",
        confirmButtonText: "Yes",
        cancelButtonColor: "#FF5C5C",
        cancelButtonText: "No",
    }).then(async (result: any) => {
        if (result.isConfirmed) {
            if (callback) {
                callback(result);
            }
        } else {
            MySwal.close();
        }
    });
}

export const numberFormatter = format({ prefix: "", integerSeparator: "," });
export const dollarFormatter = format({ prefix: "$", integerSeparator: "," });
export const dollarFormatter2 = format({ prefix: "$", integerSeparator: ",", truncate: 2, padRight: 2 });
export const dollarFormatter3 = format({ prefix: "$", integerSeparator: ",", truncate: 3, padRight: 3 });
export const dollarFormatter4 = format({ prefix: "$", integerSeparator: ",", truncate: 4, padRight: 4 });


const isDevnet = false;

export const getBlockchainHashLink = (address: any) => {
    if (isDevnet) {
        return `https://explorer.solana.com/tx/${address}?cluster=devnet`;
    }
    return `https://solscan.io/tx/${address}`;
}
export const getBlockchainAccountLink = (address: any) => {
    if (isDevnet) {
        return `https://explorer.solana.com/address/${address}?cluster=devnet`;
    }
    return `https://solscan.io/account/${address}`;
}
export const getBlockchainTokenLink = (address: any) => {
    if (isDevnet) {
        return `https://explorer.solana.com/address/${address}?cluster=devnet`;
    }
    return `https://solscan.io/token/${address}`;
}

export const getTrimedAddress = (address: any) => {
    if (!address) {
        return "";
    }
    return address.substring(0, 6) + "......" + address.substr(-6);
}



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

        const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=solana,tether,flash-protocol&include_24hr_change=true&vs_currencies=usd", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log("🚀 ~ getTokenRates ~ response:", response)
        return {
            SOL: {
                price: response.data.solana.usd,
                percent: response.data.solana.usd_24h_change
            },
            USDT: {
                price: response.data["tether"].usd,
                percent: response.data["tether"].usd_24h_change
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

