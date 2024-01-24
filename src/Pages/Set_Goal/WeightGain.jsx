import { useForm } from "react-hook-form";
import Title from "../../Components/Title/Title";

const WeightGain = () => {
  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="px-4 lg:px-10  lg:mt-10">
      <Title title="Weight Gain"></Title>
      <div className="flex items-center justify-between gap-10 mt-5">
        <div className="flex-1">
          <img
            src="https://i.ibb.co/F3jMfNG/Screenshot-411.png"
            className="w-[800px] rounded-lg shadow-2xl"
            alt=""
          />
        </div>
        <div className="flex-1">
          <h1 className="text-5xl font-bold">
            Your Comprehensive Guide to{" "}
            <span className="text-primary">Building</span> a Stronger You
          </h1>
          <p className="text-base text-gray-600 font-medium mt-5">{`Are you tired of struggling to put on weight? Whether you're looking to gain muscle mass, overcome a medical condition, or simply achieve a more robust physique, our guide has got you covered! "Unlocking Healthy Weight Gain" is your go-to resource for understanding the principles of effective weight gain without compromising your health.`}</p>
          <h1 className="text-base text-black font-medium mt-5 mb-2">
            How many kg do you want to gain in 1 month?{" "}
            <span className="text-primary text-2xl">*</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2">
              <div>
                <input
                  type="number"
                  {...register("gain_kg", { required: true })}
                  placeholder="00 kg"
                  className="input input-bordered w-full"
                />
              </div>
              <button
                className={`${buttonStyle} bg-primary hover:bg-[#ff470436]  border-transparent hover:border-primary hover:text-black `}>
                Gain
              </button>
            </div>
            {errors.gain_kg && (
              <span className="text-red-400 text-xs">
                This field is required
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default WeightGain;
