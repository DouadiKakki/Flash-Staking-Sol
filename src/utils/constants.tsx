import StakingIcon from "../assets/imgs/nav-staking.svg"
import StakingActiveIcon from "../assets/imgs/nav-staking-active.svg"
import LeaderboardIcon from "../assets/imgs/nav-leaderboard.svg"
import LeaderboardActiveIcon from "../assets/imgs/nav-leaderboard-active.svg"

export const navitemList = [
    {
        text: "Staking",
        img: StakingIcon,
        active_img: StakingActiveIcon,
        path: "/main/staking",
        active: 1,
    },
    {
        text: "Leaderboard",
        img: LeaderboardIcon,
        active_img: LeaderboardActiveIcon,
        path: "/main/leaderboard",
        active: 2,
    },
];


export const DATETIME_FORMAT = {
    MONTH_STR: 'MMM YYYY',
    SHORT_DATE_STR: 'D MMM YYYY',
    SHORT_DATE: 'YYYY-MM-DD',
    SHORT_DATE2: 'DD/MM/YYYY',
    TIME_24: 'HH:mm A'
};

