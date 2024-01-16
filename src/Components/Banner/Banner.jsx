// import React from 'react';
import banner from '../../assets/images/dumbbells-floor-gym-ai-generative.jpg'
const Banner = () => {
    const buttonStyle = 'p-2.5 w-[130px] font-bold text-white rounded border-[3px]'
    return (
        <div>
            <div className='w-full max-h-screen overflow-hidden  relative'>
                <img className='w-full h-full object-cover' src={banner} alt="" />
                <div className='absolute bg-[#00000064] w-full h-full top-0'></div>
                <div className='absolute top-[50px] sm:top-[20%] md:top-[28%] w-full'>
                    <div className=' bg-[#ff470471] w-full sm:min-h-[150px] p-5  sm:py-10 '>
                        <h1 className='text-lg sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white text-center'>welcome to the futuristic <br /> fitness tracking platform</h1>
                    </div>
                    <div className='flex justify-center items-center gap-5 sm:gap-10 py-3 sm:py-7'>
                        <button className={`${buttonStyle} bg-[#ff4704] hover:bg-transparent  border-transparent hover:border-[#ff4704]`}>Contact us</button>
                        <button className={`${buttonStyle} bg-transparent hover:bg-[#ff4704]  border-[#ff4704] hover:border-transparent`}>Log in</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;