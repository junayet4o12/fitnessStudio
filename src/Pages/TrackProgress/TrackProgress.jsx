import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GiNightSleep } from "react-icons/gi";
import HeartRate from "./HeartRate";
import ChartProgress from "./ChartProgress";
import { Helmet } from "react-helmet-async";

import { IoFootstepsOutline } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa";

import { useGetTrackProQuery, useGetTrackSleepProQuery } from "./api/baseApi";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import toast from "react-hot-toast";

const TrackProgress = () => {
  const navigate = useNavigate();

  const cardStyle =
    "mx-auto my-2 px-5 text-center bg-teal-50 bmiNumber  flex flex-col justify-center items-center py-2 rounded-xl shadow-xl";

  const progressBarStyles = {
    path: {
      stroke: "#0c0c0c",
    },
    text: {
      fill: "#0c0c0c",
      fontSize: "20px",
    },
  };
  console.log(progressBarStyles);

  const {
    data: track,
    isLoading: isTrackLoading,
    isError: isTrackError,
  } = useGetTrackProQuery();
  console.log("tracking", track);
  // // console.log(track);
  const {
    data: sleep,
    isError: isSleepError,
    isLoading: isSleepLoading,
  } = useGetTrackSleepProQuery();
  console.log("sleeping", sleep);

  const sleepDuration = sleep?.summary?.totalMinutesAsleep;
  const totalSleep = Math.floor(sleepDuration / 60);
  // // console.log(totalSleep);
  const caloriesOut = track?.summary.caloriesBMR;
  const caloBurned = track?.summary.caloriesOut;

  if (isTrackLoading || isSleepLoading) {
    return <Loading></Loading>;
  }
  if (isTrackError || isSleepError) {
    localStorage.removeItem("Authorization");
    toast.error("Please Connect Fitbit!!!");
    navigate(`/dashboard/connect_app`);
    return;
  }
  return (
    <div>
      <Helmet>
        <title>Tracking Progress - FitnessStudio</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="flex flex-col justify-center items-center mt-4 px-4">
          <h2 className="font-bold text-3xl md:text-left md:text-5xl">
            Daily <span className="text-primary">Activity</span>
          </h2>
          <p className="font-medium text-xl mt-2">
            Here are your Daily Activities. Check out the exciting things you
            have
            <br />
            accomplished today and plan for more success tomorrow.
          </p>
          <p className="font-medium text-base mt-2 max-w-[600px]">
            <strong>Note:</strong> This daily Progress data is coming from
            Fitbit app You have already connected it to our web page.
          </p>
        </div>

        <div className="container mx-auto px-2 md:py-4 flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <div className="flex flex-col lg:flex-row justify-around gap-2 ">
              <div className="lg:w-1/2 ">
                <div className={`${cardStyle}`}>
                  <div className="mb-2 flex justify-center items-center space-x-1 ">
                    <IoFootstepsOutline className="text-primary text-2xl " />
                    <h3 className="text-lg font-medium text-gray-900">Steps</h3>
                  </div>
                  <div>
                    <CircularProgressbar
                      styles={progressBarStyles}
                      value={(track?.summary?.steps / 10000) * 100}
                      text={track?.summary?.steps}
                    />
                  </div>
                </div>
              </div>
              <div className=" lg:w-1/2 flex flex-col space-y-6">
                <div className="mt-6">
                  <div className="card bg-orange-50 mb-2">
                    <div className="card-body flex flex-row justify-center bmiNumber items-center">
                      <div className="card-actions justify-start">
                        <FaCarSide className="text-primary text-2xl" />
                      </div>
                      <div className="text-black">
                        <p className="text-xl font-semibold">Distance</p>
                        <span className="text-xl font-semibold">
                          {track?.summary?.distances[0]?.distance} miles
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="card bg-blue-50 mb-1">
                    <div className="card-body flex flex-row bmiNumber justify-center items-center">
                      <div className="card-actions justify-start ">
                        <GiNightSleep className="text-primary text-2xl" />
                      </div>
                      <div className="text-black">
                        <p className="text-xl font-semibold">Sleep</p>
                        <span className="text-xl font-semibold">
                          {totalSleep} hr
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <HeartRate caloriesOut={caloriesOut} />
          </div>

          <div className="lg:w-1/2 ">
            <ChartProgress
              caloriesBurned={caloBurned}
              caloriesOut={caloriesOut}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackProgress;
