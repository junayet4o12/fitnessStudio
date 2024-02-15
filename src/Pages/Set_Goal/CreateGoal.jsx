import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CreateGoal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[160px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you create goals?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Create!",
    }).then((result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Goal Creating...");
        const goalInfo = {
          user_name: user?.displayName,
          user_email: user?.email,
          user_image: user?.photoURL,
          exercise: data?.Exercise,
          steps: data?.Steps,
          calories: data?.Calories,
          distance: data?.Distance,
        };
        axiosSecure.post("user_goal", goalInfo).then((res) => {
          if (res?.data?.insertedId) {
            reset();
            toast.success("Goal Created Successfully!", { id: toastId });
          }
        });
      }
    });
  };

  return (
    <div className="md:flex md:items-center md:justify-center min-h-screen">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-5 md:gap-10 lg:gap-20">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-primary">ACHIEVE</span> YOUR BEST
          </h1>
          <p className="text-base text-gray-600 font-medium mt-2">
            Stay on target with a weekly goal
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1 className="text-base text-black font-semibold mt-5 mb-2">
                Activity <span className="text-primary text-2xl">*</span>
              </h1>
              <div>
                {/* 1 */}
                <div className="bg-slate-100  p-5 rounded-t-xl rounded-b-md">
                  <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Exercise days</h1>
                    <div>
                      <div className="relative h-11 w-14">
                        <input
                          type="number"
                          placeholder="00"
                          {...register("Exercise", {
                            required: true,
                          })}
                          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                        />
                        <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Weekly
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.Exercise?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                      This field is required
                    </span>
                  )}
                </div>
                {/* 2 */}
                <div className="bg-slate-100 p-5 rounded-md mt-2">
                  <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Steps</h1>
                    <div>
                      <div className="relative h-11 w-14">
                        <input
                          type="number"
                          placeholder="00"
                          {...register("Steps", {
                            required: true,
                          })}
                          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                        />
                        <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Daily
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.Steps?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                      This field is required
                    </span>
                  )}
                </div>
                {/* 3 */}
                <div className="bg-slate-100 p-5 rounded-md mt-2">
                  <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Calories Burned</h1>
                    <div>
                      <div className="relative h-11 w-14">
                        <input
                          type="number"
                          placeholder="00 cal"
                          {...register("Calories", {
                            required: true,
                          })}
                          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                        />
                        <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Daily
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.Calories?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                      This field is required
                    </span>
                  )}
                </div>
                {/* 4 */}
                <div className=" bg-slate-100 p-5 rounded-b-xl rounded-t-md mt-2">
                  <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Distance</h1>
                    <div>
                      <div className="relative h-11 w-14">
                        <input
                          type="number"
                          placeholder="00 mi"
                          {...register("Distance", {
                            required: true,
                          })}
                          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                        />
                        <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Daily
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.Distance?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={`${buttonStyle} bg-primary hover:bg-[#ff470436]  border-transparent hover:border-primary hover:text-black mt-8 mb-10 lg:mb-0`}
            >
              Create Goal
            </button>
          </form>
        </div>
        <div>
          <img
            src="https://i.ibb.co/bQrRftP/Screenshot-416-removebg-preview.png"
            className="w-[700px] mt-5 md:mt-0"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CreateGoal;
