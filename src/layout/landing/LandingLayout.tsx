// ./src/components/Layout.js

import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import ImgBg from "../../assets/imgs/bg-header.png";

export default function LandingLayout() {
    return (
        <div className="bg-[#111111] relative" style={{ backgroundImage: "url(/imgs/bg-landing.png)", backgroundAttachment: "fixed" }}>
            <img src={ImgBg} className="absolute max-w-full top-0 left-[50%] -translate-x-1/2" alt="bg" />
            <Header />
            <main className="z-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}