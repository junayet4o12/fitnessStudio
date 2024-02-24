// import React from 'react';
import { useEffect, useState } from 'react';
import imgOne from '../../assets/images/fitnessModalPic.jpg'
import sliderImg2 from '../../assets/images/BannerSlider/slider1.jpg'
import sliderImg3 from '../../assets/images/BannerSlider/slider2.jpg'
import sliderImg1 from '../../assets/images/BannerSlider/slider3.jpg'
import sliderImg4 from '../../assets/images/BannerSlider/slider4.jpg'
import bg from '../../assets/images/dumbbells-floor-gym-ai-generative.jpg'

import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { EffectCreative, Navigation, Scrollbar, A11y, EffectCube, Autoplay, Pagination } from 'swiper/modules';
import { TypeAnimation } from 'react-type-animation';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
const Banner = () => {
    const { user } = useAuth();
    const buttonStyle =
        "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };
    // bg-gradient-to-l from-orange-500 to-orange-900
    const swiperTextStyle = 'w-full min-h-[93vh] xs:min-h-screen p-10 sm:p-20 flex items-center uppercase bg-black/50 text-4xl md:text-5xl xl:text-6xl'
    const textColor = 'text-secondary'
    return (
        <div >
            <div className="min-h-[93vh] max-h-[93vh] sm:min-h-screen xs:max-h-screen bg-black  relative overflow-hidden">

                <div className='overflow-hidden'>
                    <Swiper
                        grabCursor={true}
                        effect={'creative'}
                        creativeEffect={{
                            prev: {
                                shadow: true,
                                translate: [0, 0, -500],
                            },
                            next: {
                                translate: ['100%', 0, 0],
                            },
                        }}
                        modules={[EffectCreative, Navigation, Scrollbar, A11y, EffectCube, Autoplay, Pagination]}
                        className="mySwiper"
                        speed={1000}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                    >
                        <SwiperSlide><img className='min-h-screen object-cover' src={sliderImg1} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='min-h-screen object-cover' src={sliderImg2} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='min-h-screen object-cover' src={sliderImg3} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='min-h-screen object-cover' src={sliderImg4} alt="" /></SwiperSlide>

                    </Swiper>
                    <div className="flex justify-center items-end gap-5 sm:gap-10 py-20 xs:py-32 absolute bottom-0 z-20 w-full h-full ">
                        <Link to={"/contact_us"}>
                            <button
                                className={`${buttonStyle} bg-secondaryDeep hover:bg-secondaryDeep/40  border-transparent hover:border-secondarybg-secondaryDeep mt-14`}>
                                Contact us
                            </button>
                        </Link>
                        {user ? (
                            ""
                        ) : (
                            <button
                                onClick={handleLogin}
                                className={`${buttonStyle} bg-secondaryDeep/40 hover:bg-secondaryDeep  border-secondaryDeep hover:border-transparent mt-14`}>
                                Log in
                            </button>
                        )}
                    </div>
                </div>
                <div className='    font-bold   text-white absolute top-0  z-10   w-full h-full' >

                    <Swiper
                        modules={[EffectCreative, Navigation, Scrollbar, A11y, Autoplay, Pagination]}
                        className="mySwiper"
                        speed={1500}
                        autoplay={{
                            delay: 4500,
                            disableOnInteraction: false,
                        }}

                    >
                        <SwiperSlide>
                            <div className={swiperTextStyle}>
                                <h2 >Time to put <br />
                                    <span className={textColor}>fitness First</span></h2>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide> <div className={swiperTextStyle}>
                            <h2 >Get Your Body <br />
                                <span className={textColor}>in Shap</span></h2>
                        </div></SwiperSlide>
                        <SwiperSlide> <div className={swiperTextStyle}>
                            <h2>Reach to your <br />
                                <span className={textColor}>own goals </span></h2>
                        </div></SwiperSlide>
                        <SwiperSlide> <div className={swiperTextStyle}>
                            <h2 >Gain your dreams  <br />
                                <span className={textColor}>With Perfection</span></h2>
                        </div></SwiperSlide>

                    </Swiper>

                </div>
            </div>
            {/* <span className={`text-3xl sm:text-5xl uppercase font-bold min-w-full min-h-[100%] bg-black/50 absolute top-0  md:hidden z-20 flex items-center p-20 text-white `}>
                <span className='mb-10'>
                    <TypeAnimation
                        sequence={[
                            'Time to put fitness First...',
                            5000,
                            'Get Your Body in Shap...',
                            5000,
                            'Reach your goals...',
                            5000,
                            'Achieve your dreams...',
                            5000
                        ]}
                        wrapper="span"
                        speed={250}
                        style={{ display: 'inline-block' }}
                        repeat={Infinity}
                    />
                </span>
            </span> */}
            {/* <div className="flex md:hidden justify-center items-center gap-5 sm:gap-10 py-3 sm:py-7 absolute bottom-0 z-40 w-full  h-3/4">
                <Link to={"/contact_us"}>
                    <button
                        className={`${buttonStyle} bg-primary hover:bg-[#ff470436]  border-transparent hover:border-primary `}>
                        Contact us
                    </button>
                </Link>
                {user ? (
                    ""
                ) : (
                    <button
                        onClick={handleLogin}
                        className={`${buttonStyle} bg-primary/40 hover:bg-primary  border-primary hover:border-transparent`}>
                        Log in
                    </button>
                )}
            </div> */}
        </div >
    );
};

export default Banner;