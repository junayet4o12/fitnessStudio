import Title from "../../Components/Title/Title";

const ExercisePlan = () => {
  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";

  return (
    <div>
      <Title title="Exercise Plan"></Title>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 mt-5">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            The Transformative Power of{" "}
            <span className="text-primary">Walking</span> for a Healthier You
          </h1>
          <p className="text-base text-primary/70 font-medium mt-5">{`Embrace the simple yet powerful act of walking and unlock a path to better health with our comprehensive guide, "Step into Wellness." Whether you're a seasoned walker or just getting started, this resource is designed to inspire and inform, helping you harness the numerous benefits of walking for your physical and mental well-being.`}</p>

          <button
            className={`${buttonStyle} bg-primary hover:bg-primary/40  border-transparent hover:border-primary mt-5`}>
            Start
          </button>
        </div>
        <div className="flex-1">
          <img
            src="https://i.ibb.co/GF06LsC/Screenshot-413.png"
            className="w-full lg:w-[800px] rounded-lg shadow-2xl"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ExercisePlan;
