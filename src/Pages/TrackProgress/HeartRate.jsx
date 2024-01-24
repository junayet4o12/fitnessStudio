import { GiNightSleep } from "react-icons/gi";
import { CircularProgressbar,  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { IoFootstepsOutline } from "react-icons/io5";
import {  FaHeartbeat } from "react-icons/fa";
import { SlFire } from "react-icons/sl";

const HeartRate = () => {
  const cardStyle =
    "mx-auto my-2 px-5 text-center border-2 border-primary flex flex-col justify-center items-center py-2 rounded-xl shadow-xl";
  const percentage = 1962;

  const totalPercentage = (percentage / 2800) * 100;

  const progressBarStyles = {
    path: {
      stroke: "#FF4804",
    },
    text: {
      fill: "#FF4804",
      fontSize: "10px",
    },
  };

  return (
    <div className="flex flex-row justify-around gap-2">
      <div className="w 1/2 flex flex-col space-y-6">
        <div className="mt-6">
          <div className="card  border-2 border-primary mb-2">
            <div className="card-body flex flex-row justify-center items-center">
              <div className="card-actions justify-start">
                <FaHeartbeat className="text-primary text-2xl with-shadow" />
              </div>
              <div>
                <p className="text-xl font-semibold">Heart Rate</p>
                <span className="text-xl font-semibold">89 bmp</span>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="card  border-2 border-primary mb-1">
            <div className="card-body flex flex-row justify-center items-center">
              <div className="card-actions justify-start">
                <GiNightSleep className="text-primary text-2xl" />
              </div>
              <div>
                <p className="text-xl font-semibold">Water</p>
                <span className="text-xl font-semibold">2.4 litre</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 ">
        <div className={`${cardStyle}`}>
          <div className="mb-2 flex justify-center items-center space-x-1">
            <SlFire className="text-primary text-2xl" />
            <h3 className="text-lg font-medium text-gray-700">Calories</h3>
          </div>
          <div>
            <CircularProgressbar
              value={totalPercentage}
              text={`${totalPercentage.toFixed(1)}% kcal`}
              strokeWidth={20}
              styles={{
                ...progressBarStyles,
                strokeLinecap: "butt",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartRate;
