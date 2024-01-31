import Title from "../../Components/Title/Title";
import { Helmet } from 'react-helmet-async'
import Strava from "./Strava";
const ConnectApp = () => {
    const LinkStyle =
        "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold  rounded border-[3px] active:bg-[#ff470470] active:scale-90 hover:text-white";

    return (
        <div >
            <Helmet>
                <title>Connected-App - FitnessStudio</title>
            </Helmet>

            <Title title={"Seamless Connection"}></Title>

            <div className="lg:flex-row justify-center mt-8 lg:justify-around flex flex-col-reverse gap-8 items-center lg:mx-8 mx-4 ">
                <div className="lg:w-1/2 mb-4 text-sm">
                    <p className="mb-6">
                        The integration of fitness apps with tracking websites has revolutionized personal wellness. By connecting these apps to in FitnessStdio, users can effortlessly monitor their exercise data in real time. Whether it is steps taken, workout duration, or calorie burn, this seamless connection provides a comprehensive overview of physical activity.
                    </p>
                    <a href="#connect_app" to={'#connect_app'}
                        className={`${LinkStyle} bg-[#ff470436] hover:bg-[#ff4704]  border-[#ff4704] hover:border-transparent`}>
                        Connect App
                    </a>
                </div>
                <img src="https://i.ibb.co/DtCdfR3/unnamed.png" className="lg:w-1/3" alt="" />

            </div>




            <h2 className="lg:text-4xl text-xl font-semibold lg:ml-16 ml-4 mt-24">Connect Apps</h2>
            <div className="flex gap-4 lg:gap-8 flex-col items-center lg:ml-12 ml-4 mt-8 mb-12 lg:mt-12">
                <div className="lg:flex space-y-2 justify-between w-full lg:w-3/4 py-6 rounded-md shadow-lg px-4 text-gray-600 font-semibold bg-white">
                    <div className="items-center flex gap-4">
                        <img src="https://i.ibb.co/HBnFfJ9/62a896ebda9e7313e0262a77.png" className='h-8' alt="" />
                        <p className="">Fitbit</p>
                    </div>
                    <button className="p-2 lg:p-3 text-sm lg:text-md rounded-md shadow-md bg-base-300">Connect</button>
                </div>
                <div className="lg:flex space-y-2 justify-between w-full lg:w-3/4 py-6 rounded-md shadow-lg px-4 text-gray-600 font-semibold bg-white">
                    <div className="items-center flex gap-4">
                        <img src="https://i.ibb.co/pRbvZDm/suunto.png" className='h-8' alt="" />
                        <p className="">Suunto</p>
                    </div>
                    <button className="p-2 lg:p-3 text-sm lg:text-md rounded-md shadow-md bg-base-300">Connect</button>
                </div>



                <Strava></Strava>






            </div>
        </div>
    );
};

export default ConnectApp;