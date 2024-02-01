import Title from "../../Components/Title/Title";
import { Helmet } from 'react-helmet-async'
import Strava from "./Strava";
import Fitbit from "./Fitbit";
import Suunto from "./Suunto";
import useAxiosFitbitFetch from "../../Hooks/useAxiosFitbitFetch";
const ConnectApp = () => {
    const LinkStyle =
        "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold  rounded border-[3px] active:bg-[#ff470470] active:scale-90 hover:text-white";
    const axiosFitbitFetch = useAxiosFitbitFetch()

    const handleFetchData = async () => {
        const response = await axiosFitbitFetch.get('1/user/-/activities.json?activityId=90013&manualCalories=300')
        console.log(response.data)

    }

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

                <Fitbit></Fitbit>
                <Suunto></Suunto>
                <Strava></Strava>






            </div>


            <button className="btn-primary p-4 text-xl text-center" onClick={handleFetchData}> Get activity summery</button>




        </div>
    );
};

export default ConnectApp;