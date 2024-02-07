import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GiNightSleep } from "react-icons/gi";
import HeartRate from "./HeartRate";
import ChartProgress from "./ChartProgress";
import { Helmet } from "react-helmet-async";

import { IoFootstepsOutline } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa";
import { useGetTrackProQuery } from "./api/baseApi";

const TrackProgress = () => {
  const cardStyle =
    "mx-auto my-2 px-5 text-center bg-emerald-50 bmiNumber flex flex-col justify-center items-center py-2 rounded-xl shadow-xl";

  const progressBarStyles = {
    path: {
      stroke: "#FF4804",
    },
    text: {
      fill: "#FF4804",
      fontSize: "20px",
    },
  };

  const { data: track, isLoading } = useGetTrackProQuery();
  console.log("dgh", track);

  if (isLoading) {
    return <p className="">loading</p>;
  }
  // if (!track || track.length === 0) {
  //   return <p className="">No data available</p>;
  // }

  const dailyActivities = track[0]?.trackProgress?.dailyActivities || {};
  const heartRateData = track[0]?.trackProgress?.heartRate || {};
  const { weightTracking, caloriesBurned } = track[0]?.trackProgress || {};
  // console.log(weightTracking, caloriesBurned);

  const percentage = dailyActivities?.steps.percentage;

  const totalPercentage = (percentage / 10000) * 100;

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
        </div>

        <div className="container mx-auto px-2 md:py-4 flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <div className="flex flex-col lg:flex-row justify-around gap-2 ">
              <div className="lg:w-1/2 ">
                <div className={`${cardStyle}`}>
                  <div className="mb-2 flex justify-center items-center space-x-1 ">
                    <IoFootstepsOutline className="text-primary text-2xl " />
                    <h3 className="text-lg font-medium text-gray-700">
                      {dailyActivities?.steps.name}
                    </h3>
                  </div>
                  <div>
                    <CircularProgressbar
                      styles={progressBarStyles}
                      value={totalPercentage}
                      text={`${totalPercentage.toFixed(1)}%`}
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
                      <div>
                        <p className="text-xl font-semibold">
                          {dailyActivities.distance.name}
                        </p>
                        <span className="text-xl font-semibold">
                          {dailyActivities.distance.value}{" "}
                          {dailyActivities.distance.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="card bg-sky-50 mb-1">
                    <div className="card-body flex flex-row bmiNumber justify-center items-center">
                      <div className="card-actions justify-start ">
                        <GiNightSleep className="text-primary text-2xl" />
                      </div>
                      <div className="">
                        <p className="text-xl font-semibold">
                          {dailyActivities.sleep.name}
                        </p>
                        <span className="text-xl font-semibold">
                          {dailyActivities.sleep.value}{" "}
                          {dailyActivities.sleep.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <HeartRate heartRateData={heartRateData} />
          </div>

          <div className="lg:w-1/2 ">
            <ChartProgress
              weightTracking={weightTracking}
              caloriesBurned={caloriesBurned}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackProgress;