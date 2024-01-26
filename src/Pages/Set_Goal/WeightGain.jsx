import { useForm } from "react-hook-form";
import Title from "../../Components/Title/Title";

const WeightGain = () => {
  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Title title="Manage Weight"></Title>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mt-5">
        <div className="flex-1">
          <img
            src="https://i.ibb.co/F3jMfNG/Screenshot-411.png"
            className="w-full lg:w-[800px] rounded-lg shadow-2xl"
            alt=""
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Your Comprehensive Guide to{" "}
            <span className="text-primary">Building</span> a Stronger You
          </h1>
          <p className="text-base text-gray-600 font-medium mt-5">{`Are you tired of struggling to put on weight? Whether you're looking to gain muscle mass, overcome a medical condition, or simply achieve a more robust physique, our guide has got you covered! "Unlocking Healthy Weight Gain" is your go-to resource for understanding the principles of effective weight gain without compromising your health.`}</p>
          <h1 className="text-base text-black font-semibold mt-5 mb-2">
            What are you willing to do?{" "}
            <span className="text-primary text-2xl">*</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2">
              <div>
                <select
                  {...register("gain")}
                  className="select select-error w-40 md:w-48 ">
                  <option value="Gain Weight">Gain Weight</option>
                  <option value="Lose Weight">Lose Weight</option>
                  <option value="Maintain Weight">Maintain Weight</option>
                </select>
              </div>
              <button
                className={`${buttonStyle} bg-primary hover:bg-[#ff470436]  border-transparent hover:border-primary hover:text-black `}>
                Manage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WeightGain;
