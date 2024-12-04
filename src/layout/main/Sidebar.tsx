//@ts-nocheck
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

import NavItem from "./NavItem";
import { navitemList } from "../../utils/constants";

export default function Sidebar(props: any) {

    const location = useLocation();

    const [active, setActive] = useState(0);
    const [childActive, setChildActive] = useState(0);

    useEffect(() => {
        let pathname = location.pathname;
        navitemList.forEach((item) => {
            if (pathname.startsWith(item.path)) {
                setActive(item.active);
                if (item.childItems?.length > 0) {
                    item.childItems.forEach(child => {
                        if (pathname.startsWith(child.path)) {
                            setChildActive(child.active);
                        }
                    });
                } else {
                    setChildActive(0);
                }
            }
        });
    }, [location]);


    return (
        <>
            {props.mobileView && (
                <>
                    <div
                        className={`fixed top-0 left-0 w-screen h-screen z-40 ${props.show ? "block" : "hidden"}`}
                        onClick={() => { props.setShow(false); }}
                    ></div>
                </>
            )}
            <div
                className={`bg-[#181818] min-w-[270px] pb-8 px-[24px] z-10 ${props.mobileView
                    ? "fixed z-50 top-[76px] right-[10px] rounded-[8px] border border-[#2e2e2e] drop-shadow-xl"
                    : "relative flex flex-col justify-between border-r border-[#2e2e2e]"
                    } ${!props.show && "hidden"}`}
            >
                <div>
                    {!props.mobileView &&
                        <Link
                            className="flex items-center gap-x-2 pt-[18px]"
                            to={"/"}
                            target="_self"
                        >
                            <img src="/logo.png" alt="logo" className="w-[36px] h-[36px]" />
                            <span className='text-[14px] text-white font-semibold hidden md:block text-nowrap'>
                                <span className='text-[#FFC000]'>Flash</span> Staking
                            </span>
                        </Link>
                    }

                    <div className={`${props.mobileView ? 'mt-[30px]' : 'mt-[66px]'}`}>
                        <div className="flex flex-col gap-y-2">
                            <div className="text-[#606060] text-[14px] mb-[20px]">MENU</div>
                            {navitemList.map((item, index) => (
                                <NavItem
                                    key={index}
                                    text={item.text}
                                    img={item.img}
                                    active_img={item.active_img}
                                    active={active === item.active && true}
                                    path={item.path}
                                    childItems={item.childItems}
                                    childActive={childActive}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}