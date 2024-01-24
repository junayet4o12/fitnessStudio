import Title from "../../Components/Title/Title";

const Activity = () => {
  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";

  return (
    <div className="px-4 lg:px-10  lg:mt-10">
      <Title title="Activity"></Title>
      <div className="flex items-center justify-between gap-10 mt-5">
        <div className="flex-1">
          <h1 className="text-5xl font-bold">
            Set and Achieve Your Ultimate{" "}
            <span className="text-primary">Activity</span> Goals
          </h1>
          <p className="text-base text-gray-600 font-medium mt-5">{`Embark on a transformative journey toward a more active and fulfilling life with our guide, "Active Living Revolution." Whether you're a fitness enthusiast or just starting your wellness adventure, this resource is your go-to companion for setting and achieving meaningful activity goals.`}</p>

          <button
            className={`${buttonStyle} bg-primary hover:bg-[#ff470436]  border-transparent hover:border-primary hover:text-black mt-5`}>
            Create Goal
          </button>
        </div>
        <div className="flex-1">
          <img
            src="https://i.ibb.co/Gvk1bjP/Screenshot-414.png"
            className="w-[800px] rounded-lg shadow-2xl"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Activity;
