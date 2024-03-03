import sliderImg1 from '../../assets/images/BannerSlider/slider2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { EffectCreative, Navigation, Scrollbar, A11y, Autoplay, Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
const Banner = () => {
    const { user } = useAuth();
    const buttonStyle =
        "py-2 p-1.5 sm:py-2.5 sm:p-2.5 transition-all duration-500 w-[90px] sm:w-[130px] text-sm sm:text-base font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };
    // bg-gradient-to-l from-orange-500 to-orange-900
    const swiperTextStyle = '  px-10 sm:px-20 flex  items-center uppercase text-2xl sm:text-4xl md:text-5xl xl:text-6xl flex'
    const textColor = 'text-secondary'
    return (
        <div>
            <div className="h-[300px] xs:h-full md:min-h-screen sm:max-h-screen relative overflow-hidden">

                <div className='overflow-hidden'>
                    <div>
                        <div ><img className='min-h-[300px]  md:min-h-screen object-cover min-w-full' src={sliderImg1} alt="" /></div >


                    </div>
                   
                </div>
                <div className='    font-bold   text-black absolute top-0  z-10   w-full h-1/2  border-black flex justify-start items-end ' >

                    <Swiper
                        modules={[EffectCreative, Navigation, Scrollbar, A11y, Autoplay, Pagination]}
                        className="mySwiper"
                        speed={2000}
                        autoplay={{
                            delay: 5500,
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
                                <span className={textColor}>in Shape</span></h2>
                        </div></SwiperSlide>
                        <SwiperSlide> <div className={swiperTextStyle}>
                            <h2>Reach to your <br />
                                <span className={textColor}>own goals </span></h2>
                        </div></SwiperSlide>
                        <SwiperSlide> <div className={swiperTextStyle}>
                            <h2 >Achieve   <br />
                                <span className={textColor}>your dreams</span></h2>
                        </div></SwiperSlide>

                    </Swiper>

                </div>
                <div className='font-bold   text-black absolute bottom-0  z-10   w-full h-1/2   pt-5' >
                    <div className="flex flex-wrap  gap-5   z-20 w-full   px-10 sm:px-20 ">
                        <Link to={"/contact_us"}>
                            <button
                                className={`${buttonStyle} bg-primary hover:bg-primary/70  border-transparent hover:border-secondary `}>
                                Contact us
                            </button>
                        </Link>
                        {user ? (
                            ""
                        ) : (
                            <button
                                onClick={handleLogin}
                                className={`${buttonStyle} bg-primary/80 border-transparent hover:bg-primary   hover:border-transparent`}>
                                Log in
                            </button>
                        )}
                    </div>


                </div>
            </div>
        </div >
    );
};

export default Banner;