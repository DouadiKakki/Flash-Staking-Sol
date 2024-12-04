// @ts-nocheck

import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import ImgSendEmail from '../../assets/imgs/icon-sendemail.svg';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Footer(props: any) {

    const [email, setEmail] = useState('');
    const handleSendEmail = () => {
        if (email) {
            // window.open(`mailto:email`);
        } else {
            toast.error("Email is required!");
        }
    }

    return (
        <div className='w-full p-[20px] lg:p-[60px] text-[#B3B3B3] text-[16px]'>
            <div className='bg-[#181818] min-h-[600px] flex flex-col justify-between rounded-[18px] lg:rounded-[40px] pt-[40px] lg:pt-[96px] pb-[24px] px-[20px] mx-auto'>
                <div className='max-w-full w-[1520px] mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-[40px] lg:gap-[20px]'>
                    <div className='flex flex-col'>
                        <Link to='/' className='flex flex-col lg:flex-row gap-2 items-center'>
                            <img src="/logo.png" alt="" className="w-[50px] h-[50px]" />
                            <span className='text-[24px] text-white font-semibold text-nowrap'>
                                <span className='text-[#FFC000]'>Flash</span> Staking
                            </span>
                        </Link>
                        <div className='max-w-[330px] mt-[24px] text-center lg:text-start'>
                            We proudly collaborate with a diverse range of trusted partners to enhance your experience and provide seamless access to the best in crypto services.
                        </div>
                    </div>
                    <div className='flex flex-col items-center lg:items-start gap-3'>
                        <div className='text-white text-[20px] font-[500] mb-1'>Product</div>
                        <a href="https://www.flash-technologies.org/" target={"_blank"} rel="noreferrer" className="hover:text-[#FFC000]">Flash Technologies</a>
                        <a href="https://flash-transfer.com/" target={"_blank"} rel="noreferrer" className="hover:text-[#FFC000]">Flash Transfer</a>
                        <a href="https://flash-dex.com/" target={"_blank"} rel="noreferrer" className="hover:text-[#FFC000]">Flash Dex</a>
                        {/* <a href="https://flash-staking.com/" target={"_blank"} rel="noreferrer" className="hover:text-[#FFC000]">Flash Staking</a> */}
                        <a href="https://flash-launch.com/" target={"_blank"} rel="noreferrer" className="hover:text-[#FFC000]">Flash Launchpad</a>
                        <a href="https://flash-dead.com/" target={"_blank"} rel="noreferrer" className="hover:text-[#FFC000]">Flash Dead</a>
                    </div>
                    <div className='flex flex-col items-center lg:items-start gap-3'>
                        <div className='text-white text-[20px] font-[500] mb-1'>Support</div>
                        <a href="/" target={"_blank"} rel="noreferrer" className="hover:text-[#FFC000]">Documentation</a>
                        <a href="/" target={"_blank"} rel="noreferrer" className="hover:text-[#FFC000]">Contact Us</a>
                    </div>
                    <div className='flex flex-col items-center lg:items-start gap-3'>
                        <div className='text-white text-[20px] font-[500] mb-1'>Social network </div>
                        <a href="https://www.facebook.com/flashtechnologiesoff" rel="noreferrer" className="hover:text-[#FFC000]" target={'_blank'}>Facebook</a>
                        <a href="https://instagram.com/flash_token_off" rel="noreferrer" className="hover:text-[#FFC000]" target={'_blank'}>Instagram</a>
                        <a href="https://www.linkedin.com/company/flash-technologies-off/" rel="noreferrer" className="hover:text-[#FFC000]" target={'_blank'}>LinkedIn</a>
                    </div>
                    <div className='flex flex-col items-center lg:items-start gap-3 w-full lg:w-auto'>
                        <div className='text-white text-[20px] font-[500] mb-1'>Sign up to our newsletter</div>
                        <div className='w-full'>
                            <Input
                                placeholder='Enter your email'
                                className='lg:w-[310px] max-w-full'
                                rightIcon={ImgSendEmail}
                                rightIconClick={handleSendEmail}
                                value={email}
                                setValue={setEmail}
                            />
                        </div>
                    </div>
                </div>
                <div className='max-w-full w-[1520px] mx-auto flex items-center justify-center border-t-[2px] border-[#232323] pt-[24px] mt-[50px]'>
                    <span className='text-[#B3B3B3] text-[16px] font-[400] text-center'>© 2024 Flash Staking. All rights reserved.</span>
                </div>
            </div>
        </div>
    )
}