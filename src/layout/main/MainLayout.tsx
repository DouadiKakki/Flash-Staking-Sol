
import { Outlet } from "react-router-dom"
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function MainLayout() {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [sideBarShow, setSideBarShow] = useState(false);

    return (
        <>
            <div className="flex bg-[#131313]">
                <Sidebar
                    mobileView={isTabletOrMobile}
                    show={isTabletOrMobile ? sideBarShow : true}
                    setShow={setSideBarShow} />
                <div className="w-full flex-grow flex flex-col">
                    <Header onMenuClick={() => setSideBarShow(!sideBarShow)} />
                    <div className={`${isTabletOrMobile ? 'w-full' : `w-[calc(100vw-270px)]`} min-h-[calc(100vh-72px)] p-[20px] lg:p-[32px]`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}