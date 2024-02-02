import { useForm } from "react-hook-form";
import useBRM_Calculate from "./useBMR_Calculate";
import useCalories_Calculate from "./useCalories_Calculate";
import { useState } from "react";

const BMR_Calculate = () => {
  const [neededCalories, setNeededCalories] = useState("")
  const [userDetails, maleBMR, femaleBMR] = useBRM_Calculate()
  const [sedentaryActive, lightlyActive, moderatelyActive, veryActive, extremelyActive] = useCalories_Calculate()
  const { register, reset, handleSubmit } = useForm();

  const onSubmit = (data) => {
    reset();
    setNeededCalories(data?.active)
  };

  console.log(neededCalories)

  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[160px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 mt-5">
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Basal Metabolic Rate <span className="text-primary">(BMR)</span>
        </h1>
        <p className="text-base text-gray-600 font-medium mt-5">{`This guide goes beyond the basics, providing practical tips on calculating and utilizing your BMR to set realistic weight management goals. Uncover the relationship between BMR and calorie consumption, and learn how to strike a balance that fosters sustainable weight loss, maintenance, or muscle gain.`}</p>
        <p className="text-3xl md:text-4xl lg:text-xl font-bold mt-2 mb-1">
          Your BMR is{" "}
          <span className="text-primary font-sans">
            {userDetails?.gender === "Male" && maleBMR.toFixed(2)}
            {userDetails?.gender === "Female" && femaleBMR.toFixed(2)}
          </span>{" "}
          cal/day.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-2">
            <select
              {...register("active")}
              className="select select-error w-full h-[50px] max-w-xs">
              <option>Sedentary Active</option>
              <option>Lightly Active</option>
              <option>Moderately Active</option>
              <option>Very Active</option>
              <option>Extremely Active</option>
            </select>
            <button
              type="submit"
              className={`${buttonStyle} bg-primary hover:bg-[#ff470436]  border-transparent hover:border-primary hover:text-black`}>
              Calories Needed
            </button>
          </div>
        </form>
        <p className="text-3xl md:text-4xl lg:text-xl font-bold mt-2 mb-1">
          Your Needed Calories is{" "}
          <span className="text-primary font-sans">
            {neededCalories === "Sedentary Active" && sedentaryActive?.toFixed(2)}
            {neededCalories === "Lightly Active" && lightlyActive?.toFixed(2)}
            {neededCalories === "Moderately Active" && moderatelyActive?.toFixed(2)}
            {neededCalories === "Very Active" && veryActive?.toFixed(2)}
            {neededCalories === "Extremely Active" && extremelyActive?.toFixed(2)}
          </span>{" "}
          kcal
        </p>
      </div>
      <div className="flex-1">
        <img
          src="https://i.ibb.co/HGpMMLB/BMR-img.png"
          className="w-full lg:w-[700px]"
          alt=""
        />
      </div>
    </div>
  );
};

export default BMR_Calculate;
