import { useForm } from "react-hook-form";

const CreateGoal = () => {
  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[160px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="px-4 lg:px-10 flex items-center justify-center h-full">
      <div className="flex items-center justify-center gap-20">
        <div>
          <h1 className="text-5xl font-bold">
            <span className="text-primary">ACHIEVE</span> YOUR BEST
          </h1>
          <p className="text-base text-gray-600 font-medium mt-2">
            Stay on target with a weekly goal
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <h1 className="text-base text-black font-semibold mt-5 mb-2">
                  Activity <span className="text-primary text-2xl">*</span>
                </h1>
                <select
                  {...register("Activity")}
                  className="select select-error w-96">
                  <option value="Any">Any</option>
                  <option value="Run">Run</option>
                  <option value="Walk">Walk</option>
                  <option value="Ride">Ride</option>
                </select>
              </div>
              <div>
                <h1 className="text-base text-black font-semibold mt-2 mb-2">
                  Goal Type <span className="text-primary text-2xl">*</span>
                </h1>
                <select
                  {...register("Goal_Type")}
                  className="select select-error w-96">
                  <option value="Workouts">Workouts</option>
                  <option value="Distance">Distance</option>
                  <option value="Duration">Duration</option>
                </select>
              </div>
              <div>
                <h1 className="text-base text-black font-semibold mt-2 mb-2">
                  Goal Target <span className="text-primary text-2xl">*</span>
                </h1>
                <input
                  type="number"
                  {...register("Goal_Target")}
                  defaultValue={1}
                  className="input input-bordered input-error w-96"
                />
              </div>
              <div>
                <h1 className="text-base text-black font-semibold mt-2 mb-2">
                  Start <span className="text-primary text-2xl">*</span>
                </h1>
                <select
                  {...register("Start")}
                  className="select select-error w-96">
                  <option value="This Week">This Week</option>
                  <option value="Next Week">Next Week</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className={`${buttonStyle} bg-primary hover:bg-[#ff470436]  border-transparent hover:border-primary hover:text-black mt-8`}>
              Create Goal
            </button>
          </form>
        </div>
        <div>
          <img
            src="https://i.ibb.co/bQrRftP/Screenshot-416-removebg-preview.png"
            className="w-[700px] "
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CreateGoal;
