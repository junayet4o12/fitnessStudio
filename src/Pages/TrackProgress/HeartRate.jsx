/* eslint-disable react/prop-types */
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LuGlassWater } from "react-icons/lu";
import { FaWeight } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { useGetTrackWaterProQuery } from "./api/baseApi";
import useDailyActivities from "../../Hooks/useDailyActivities";

const HeartRate = () => {
  const [weight] = useDailyActivities();
  console.log(weight);

  const cardStyle =
    "mx-auto my-2 px-5 text-center bg-teal-50 bmiNumber flex flex-col justify-center items-center py-2 rounded-xl shadow-xl";

  const progressBarStyles = {
    path: {
      stroke: "#0c0c0c",
    },
    text: {
      fill: "#0c0c0c",
      fontSize: "10px",
      fontFamily: "Poppins",
    },
  };
  const { data: water, isLoading } = useGetTrackWaterProQuery();

  if (isLoading) {
    return "";
  }

  const waterConsumed = water?.summary?.water;

  const specificWeight = weight?.find(
    (category) => category?.tracking_goal === "Weight_Management"
  );
  console.log(specificWeight);

  const bmiWeight =
    specificWeight && specificWeight.current_weight !== undefined
      ? specificWeight.current_weight
      : specificWeight?.user_current_weight ;
  console.log(bmiWeight);

  const bmiHeightInInches = specificWeight?.user_current_height;
  console.log(bmiHeightInInches);
  // Convert height from inches to meters
  const bmiHeightInMeters = bmiHeightInInches / 39.37;
  // Calculate BMI
  const bmi = bmiWeight / (bmiHeightInMeters * bmiHeightInMeters) || 0;
  console.log(bmi);

  return (
    <div className="flex flex-col lg:flex-row justify-around gap-2">
      <div className="lg:w-1/2 flex flex-col space-y-6">
        <div className="mt-6">
          <div className="card bg-blue-50 mb-2 ">
            <div className="card-body flex flex-row bmiNumber justify-center items-center">
              <div className="card-actions justify-start">
                <FaWeight className="text-primary text-2xl with-shadow" />
              </div>
              <div className="text-black">
                <p className="text-xl font-semibold">Current Bmi</p>
                <span className="text-xl font-semibold bmiNumber">
                  {bmi.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="card bg-orange-50  mb-1">
            <div className="card-body flex flex-row bmiNumber justify-center text-black items-center">
              <div className="card-actions justify-start text-black">
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
            <h3 className="text-lg font-medium text-gray-700">
              Current Weight
            </h3>
          </div>
          <div>
            <CircularProgressbar
              value={
                specificWeight && specificWeight.current_weight !== undefined
                  ? specificWeight?.current_weight
                  : specificWeight?.user_current_weight 
              }
              text={
                specificWeight && specificWeight.current_weight !== undefined
                  ? specificWeight.current_weight
                  : specificWeight?.user_current_weight
              }
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
