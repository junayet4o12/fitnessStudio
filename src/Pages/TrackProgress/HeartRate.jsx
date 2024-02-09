/* eslint-disable react/prop-types */
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LuGlassWater } from "react-icons/lu";
import { FaWeight } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { useGetTrackWaterProQuery, useGetTrackWeightProQuery } from "./api/baseApi";

const HeartRate = () => {
  const cardStyle =
    "mx-auto my-2 px-5 text-center bg-teal-50 bmiNumber flex flex-col justify-center items-center py-2 rounded-xl shadow-xl";

  const progressBarStyles = {
    path: {
      stroke: "#FF4804",
    },
    text: {
      fill: "#FF4804",
      fontSize: "10px",
      fontFamily: "Poppins",
    },
  };
  const { data: water, isLoading } = useGetTrackWaterProQuery();
  const { data: weight } = useGetTrackWeightProQuery();
  // console.log(" weight", weight.weight[0].weight);

  if (isLoading) {
    return "";
  }

  const waterConsumed = water?.summary?.water;

  return (
    <div className="flex flex-col lg:flex-row justify-around gap-2">
      <div className="lg:w-1/2 flex flex-col space-y-6">
        <div className="mt-6">
          <div className="card bg-blue-50 mb-2 ">
            <div className="card-body flex flex-row bmiNumber justify-center items-center">
              <div className="card-actions justify-start">
                <FaWeight className="text-primary text-2xl with-shadow" />
              </div>
              <div>
                <p className="text-xl font-semibold">Current Bmi</p>
                <span className="text-xl font-semibold bmiNumber"> {weight?.weight[0]?.bmi}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="card bg-orange-50  mb-1">
            <div className="card-body flex flex-row bmiNumber justify-center items-center">
              <div className="card-actions justify-start">
                <LuGlassWater className="text-primary text-2xl" />
              </div>
              <div>
                <p className="text-xl font-semibold">Water</p>
                <span className="text-xl font-semibold bmiNumber">
                  {waterConsumed} ml
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 ">
        <div className={`${cardStyle}`}>
          <div className="mb-2 flex justify-center items-center space-x-1">
            <GiWeightLiftingUp className="text-primary text-2xl" />
            <h3 className="text-lg font-medium text-gray-700">Current Weight</h3>
          </div>
          <div>
            <CircularProgressbar
              value={(weight?.weight[0]?.weight ) * 100}
              text={`${weight?.weight[0]?.weight} kg`}
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
