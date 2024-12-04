import format from "format-number";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

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

