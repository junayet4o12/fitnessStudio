/* eslint-disable react/no-unknown-property */

import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import Loading from "../Components/Loading";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import useDailyActivities from "../Hooks/useDailyActivities";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";

const EnduranceTrack = ({ completedGoalsrefetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [weight, isLoading, refetch] = useDailyActivities();
  console.log('weight is', weight)
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth()

  if (isLoading) {
    return <Loading />;
  }

  const specificEndurance = weight?.find(
    (category) => category.tracking_goal === "Endurance"
  );

  if (!specificEndurance) {
    return (
      <div className="card my-4 ml-0 lg:ml-28 w-full max-w-2xl bg-teal-500 text-primary-content">
        <div className="card-body justify-center">
          <h2 className="card-title text-center">No Endurance goal you have !!!</h2>
          <div className="card-actions justify-center">
            <Link to="/dashboard/set_goal">
              <button className="btn">Set Goal</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const calculateEndurance = specificEndurance;
  console.log(calculateEndurance);


  const day = Math.ceil((new Date(calculateEndurance?.timeline).getTime() - new Date().getTime()) / 86400000);
  const days = new Date().getTime() - new Date(calculateEndurance?.timeline).getTime();
  console.log(days, calculateEndurance?.timeline);

  const targetDistance = parseInt(calculateEndurance?.distance) || 0;
  const currentDistance = calculateEndurance?.current_distance;


  const onSubmit = async (data) => {
    console.log(data?.currentDistance);
    const updatedData = {
      current_distance: parseInt(data?.currentDistance),
      distance: calculateEndurance?.distance,
      email: user?.email,
      tracking_goal: specificEndurance?.tracking_goal
    };
    // console.log(updatedData);
    const res = await axiosPublic?.put(
      `/user_goal/${calculateEndurance?._id}`,
      updatedData
    );

    if (res.data.modifiedCount > 0) {
      completedGoalsrefetch()
      Swal.fire({
        title: "Success!",
        text: "Goal details successfully Updated",
        icon: "success",
        confirmButtonText: "Cool",
      });
    }
    refetch();
    setIsOpen(false);
  };
  const handleDeleteGoal = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, stop it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/user_goal/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "stop!",
              text: "Your file has been stoped.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const form =
    "block bmiNumber w-full px-4 py-3 text-sm text-gray-800 bg-white border border-primary rounded-md focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-40 ";

  if (days > 0) {
    Swal.fire({
      title: "Alert!",
      text: "Your goal timeline has ended!",
      icon: "warning",
      confirmButtonText: "Got it",
    });
  }


  const completedPercentage = Math.ceil((currentDistance / targetDistance) * 100) || 0;
  console.log(calculateEndurance.completed);
  return (
    <div className="my-4 ml-0 lg:ml-28">
      <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium bmiNumber text-gray-600 dark:text-gray-400">
            Total time {day ? day : "0"} days
          </span>
          <button
            onClick={() => handleDeleteGoal(calculateEndurance?._id)}
            className="px-3 py-1 text-sm font-bold  text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded animate-bounce cursor-pointer hover:bg-gray-500"
          >
            Stop Goal
          </button>
        </div>

        <div className="w-40 my-2">

          <ProgressBar
            width="350px"
            bgColor="#0c0c0c"
            completed={completedPercentage}
            maxCompleted={100}
          />

        </div>

        <div className="mt-2">
          <h2 className="text-xl font-bold text-gray-700 hover:text-gray-600 ">
            Tracked by Endurance Tracking
          </h2>
          <h2 className="text-sm font-bold text-gray-700 hover:text-gray-600 mt-1 bmiNumber ">
            Target distance to cover: {" "}
            <span className="text-primary">
              {calculateEndurance?.distance}
            </span>{" "}
            Km
          </h2>
          <h2 className="text-sm font-bold text-gray-700 hover:text-gray-600 mt-1 bmiNumber ">
            current total covered distance: {" "}
            <span className="text-primary">
              {calculateEndurance?.current_distance}
            </span>{" "}
            Km
          </h2>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="relative flex justify-center">
            <button
              disabled={currentDistance >= targetDistance}
              onClick={() => setIsOpen(true)}
              className={` px-6 py-2 mx-auto tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-md  font-semibold `}
            >
              Update
            </button>

          

            {isOpen && (
              <div
                className="fixed inset-0 z-10 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <span
                    className="hidden sm:inline-block sm:h-screen sm:align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>

                  <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                      id="modal-title"
                    >
                      {specificEndurance?.activityTypes.label} Goal
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Here updated your total covered distance by<span className="font-bold text-black">{specificEndurance?.activityTypes.label}</span> after setting up the goal.
                    </p>

                    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                      <label className="text-sm text-gray-700 ">
                        Current covered distance
                      </label>

                      <label className="block mt-3">
                        <input
                          type="text"
                          placeholder="Type here"
                          {...register("currentDistance", {
                            required: true,
                          })}
                          defaultValue={
                            calculateEndurance?.current_distance
                              ? calculateEndurance.currentDistance
                              : 0
                          }
                          className={`${form}`}
                        />
                      </label>

                      {/* <label className="text-sm text-gray-700 mt-2">Fat</label>
                      <label className="block mt-2">
                        <input
                          type="text"
                          placeholder="Type here"
                          {...register("bodyFat", {
                            required: true,
                          })}
                          defaultValue={calculateEndurance?.bodyFat}
                          className={`${form}`}
                        />
                      </label> */}

                      <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                        <button
                          type="button"
                          onClick={() => setIsOpen(false)}
                          className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-40"
                        >
                          Update Goal
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center ml-1">
            <img
              className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              src={calculateEndurance?.user_image}
              alt="avatar"
            />
            <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
              {calculateEndurance?.user_name}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnduranceTrack;
