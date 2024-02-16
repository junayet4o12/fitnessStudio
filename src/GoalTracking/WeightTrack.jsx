/* eslint-disable react/no-unknown-property */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import Loading from "../Components/Loading";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const WeightTrack = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const { register, handleSubmit } = useForm();

  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: weight = [], isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user_goal/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  const specificWeight = weight?.find(
    (category) => category.tracking_goal === "Weight_Management"
  );

  const calculateWeight = specificWeight;
  console.log(calculateWeight);
  const dayOfMonth = parseInt(calculateWeight?.timeline?.slice(-2));


  const originalDate = new Date();
  const formattedDate = parseInt(
    originalDate.getDate().toString().padStart(2, 0)
  );

  const day = dayOfMonth - formattedDate;

  const targetKg = parseInt(calculateWeight?.targetWeight);
  const current = calculateWeight?.user_current_weight;


  const onSubmit = async (data) => {
    const updatedData = {
      user_current_weight: parseInt(data?.user_current_weight),
      bodyFat: data?.bodyFat,
    };
    console.log(updatedData);
    const res = await axiosPublic.put(
      `/user_goal/${calculateWeight?._id}`,
      updatedData
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        title: "Success!",
        text: "Task details successfully Updated",
        icon: "success",
        confirmButtonText: "Cool",
      });
    }
    refetch()
    setOpen(false)
  };

  return (
    <div className="my-4 ml-0 lg:ml-28">
      <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium bmiNumber text-gray-600 dark:text-gray-400">
            Total time {day} days
          </span>
          <button className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
            Stop Goal
          </button>
        </div>

        <div className="w-40 my-2">
        
          <ProgressBar width="350px"  bgColor="#FF4804" completed={current} maxCompleted={targetKg} />
        </div>

        <div className="mt-2">
          <h2 className="text-xl font-bold text-gray-700 hover:text-gray-600 ">
            Tracked by Weight Management
          </h2>
          <h2 className="text-sm font-bold text-gray-700 hover:text-gray-600 mt-1 bmiNumber ">
            Target Weight {calculateWeight?.targetWeight} kg
          </h2>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <button
              onClick={handleOpen}
              className="btn btn-error my-2 text-white"
            >
              Update
            </button>

            {open && (
              <div className=" flex">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label className="label">
                      <span className="label-text">Current Weight</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      {...register("user_current_weight", {
                        required: true,
                      })}
                      defaultValue={calculateWeight?.user_current_weight}
                      className="input input-bordered input-error mb-2 w-full max-w-xs bmiNumber "
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Fat</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      {...register("bodyFat", {
                        required: true,
                      })}
                      defaultValue={calculateWeight.bodyFat}
                      className="input input-bordered input-error w-full max-w-xs bmiNumber"
                    />
                  </div>

                  <button
                    className="btn btn-error my-1 w-full max-w-xs"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="flex items-center ml-1">
            <img
              className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              src={calculateWeight?.user_image}
              alt="avatar"
            />
            <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
              {calculateWeight?.user_name}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightTrack;
