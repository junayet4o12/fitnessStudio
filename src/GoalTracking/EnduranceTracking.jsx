import ProgressBar from "@ramonak/react-progress-bar";
import { FaRoad } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";

const EnduranceTracking = () => {
  const axiosPublic = useAxiosPublic();
  const [update, setUpdate] = useState(0);
  const { user } = useAuth();
  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";
  const { register, handleSubmit } = useForm();

  const { data: userPersonalGoal } = useQuery({
    queryKey: ["userPersonalGoal"],
    queryFn: async () => {
      const res = await axiosPublic(`/user_goal/${user?.email}`);
      return res?.data;
    },
  });
  const enduranceGoal = userPersonalGoal?.filter(
    (goal) => goal?.tracking_goal === "Endurance"
  );
  const [goalData] = enduranceGoal || [];
  const userTargetGoalTime = parseInt(goalData?.goalTime);
  const userTargetDistance = parseInt(goalData?.distance);
  const prograss = parseInt(
    (update / (userTargetGoalTime + userTargetDistance)) * 100
  );

  const onSubmit = (data) => {
    const distance = parseInt(data?.distance);
    const duration = parseInt(data?.duration);
    const count = distance + duration;
    setUpdate(count);
  };

  return (
    <div className="px-20">
      <div>
        <h1 className="text-2xl font-semibold">{`Endurance -> ${goalData?.activityTypes?.label}`}</h1>
        <ProgressBar completed={prograss} maxCompleted={100} className="mt-3" />
      </div>
      {/* Manuel Form Container */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="Container flex gap-5 ">
          {/* Distance Field */}
          <div className="bg-slate-100 p-5 rounded-md mt-2 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <FaRoad className="text-xl" />
                <h1 className="font-semibold text-gray-600">Distance</h1>
              </div>
              <div>
                <div className="relative h-11 w-14">
                  <input
                    type="number"
                    placeholder="00"
                    {...register("distance", {
                      required: true,
                    })}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    km
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Duration Field */}
          <div className="bg-slate-100 p-5 rounded-md mt-2 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <IoTimeSharp className="text-2xl" />
                <h1 className="font-semibold text-gray-600">Duration</h1>
              </div>
              <div>
                <div className="relative h-11 w-14">
                  <input
                    type="number"
                    placeholder="00"
                    {...register("duration", {
                      required: true,
                    })}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    minit
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --- */}
        <p className="w-full mx-auto border-b"></p>
        <div className="flex justify-between items-center mt-3">
          <h1 className="font-semibold text-gray-600">Total Time</h1>
          <h1 className="font-semibold text-gray-600 font-sans">1 Day</h1>
          <button
            type="submit"
            className={`${buttonStyle} bg-primary hover:bg-[#ff470436]  border-transparent hover:border-primary hover:text-black `}>
            Update Now
          </button>
        </div>
      </form>
      {/*  */}
    </div>
  );
};

export default EnduranceTracking;
