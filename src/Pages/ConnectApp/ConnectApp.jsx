import Title from "../../Components/Title/Title";
import { Helmet } from 'react-helmet-async'
import Fitbit from "./Fitbit";
import Strava from "./Strava/Strava";
const ConnectApp = () => {
    const LinkStyle =
        "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold  rounded border-[3px] active:bg-primary/70 active:scale-90 hover:text-white";


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
                        className={`${LinkStyle} bg-primary/35 hover:bg-primary  border-primary hover:border-transparent`}>
                        Connect App
                    </a>
                </div>
                <img src="https://i.ibb.co/DtCdfR3/unnamed.png" className="lg:w-1/3" alt="" />
            </div>
            <h2 className="lg:text-4xl text-xl font-semibold lg:ml-16 ml-4 mt-24">Connect Apps</h2>
            <div className="flex gap-4 lg:gap-8 flex-col items-center lg:ml-12 ml-4 mt-8 mb-12 lg:mt-12">
                <Fitbit></Fitbit>
                <Strava></Strava>
            </div>
        </div>
    );
};

export default ConnectApp;