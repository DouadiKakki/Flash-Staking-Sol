//@ts-nocheck
import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"

import { Link, useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton";
import { useDebounceCallback, useEventListener, useOnClickOutside } from "usehooks-ts";

import ImgHamburger from "../../assets/imgs/hamburger.svg";
import { scrollTo } from "../../utils/animateScroll";

const menus = [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "howto", name: "How to stake" },
    { id: "benefits", name: "Benefits" },
    { id: "statistics", name: "Statistics" },
]


export default function Header(props: any) {
    
    const navigate = useNavigate();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });


    const [showHeaderBg, setShowHeaderBg] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const btnRef = useRef(null);
    const menuRef = useRef(null);
    useOnClickOutside([btnRef, menuRef], (e) => {
        setShowMobileMenu(false);
    });

    useEffect(() => {
        setShowMobileMenu(false);
    }, [isTabletOrMobile]);

    const onScroll = () => {
        setShowHeaderBg(window.scrollY > 100);
    }
    const debounced = useDebounceCallback(onScroll, 100);
    useEventListener('scroll', debounced);

    const scrollToSection = (id) => {
        scrollTo({ id });
        setShowMobileMenu(false);
    }

    return (
        <header className={`w-full z-50 fixed top-0 left-0 px-[20px] py-[30px] md:py-[32px] ${showHeaderBg ? 'bg-[#111111d0]' : 'bg-transparent'}`}>
            <div className='max-w-full w-[1440px] mx-auto flex items-center justify-between relative gap-4'>
                <Link to='/' className='flex flex-row gap-2 items-center'>
                    <img src="/logo.png" alt="" className="w-[50px] h-[50px]" />
                    <span className='text-[24px] text-white font-semibold hidden md:block text-nowrap'>
                        <span className='text-[#FFC000]'>Flash</span> Staking
                    </span>
                </Link>

                <ul className='hidden md:flex flex-row gap-4 lg:gap-8'>
                    {menus.map(item =>
                        <li key={item.id}
                            className='text-center font-normal text-[18px] text-[#E7E7E9] hover:text-[#FFC000] cursor-pointer'
                            onClick={() => scrollToSection(item.id)}
                        >
                            {item.name}
                        </li>
                    )}
                </ul>

                <IconButton
                    text='Start Staking'
                    className='hidden xl:flex min-w-[188px]'
                    onClick={() => navigate("/main/staking")}
                />

                <div ref={btnRef}
                    className="md:hidden w-[44px] h-[44px] rounded-full flex items-center justify-center bg-[#181818]"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    <img src={ImgHamburger} alt="hamburger" />
                </div>

                {showMobileMenu &&
                    <div
                        ref={menuRef}
                        className='bg-[#1B1B1B] rounded-[16px] w-[300px] p-4 flex flex-col gap-4 z-50 absolute right-4 top-[60px] shadow-[0_19px_12px_0px_#00000040]'
                    >
                        {menus.map(item =>
                            <div key={item.id}
                                className='font-normal text-[#E7E7E9] text-[18px] p-4 border-b border-[#212121]'
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.name}
                            </div>
                        )}
                        <IconButton
                            text='Start Staking'
                            className='w-full'
                            onClick={() => navigate("/main/staking")}
                        />
                    </div>
                }
            </div>
        </header>
    )
}