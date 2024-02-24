import { Helmet } from "react-helmet-async";
import WeightTrack from "./WeightTrack";
// import Title from "../Components/Title/Title";
// import EnduranceTracking from "./EnduranceTracking";

const GoalTrackingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Goal Tracking - FitnessStudio</title>
      </Helmet>
      <div className="">
        <div className="flex flex-col justify-center items-center mt-4 px-4">
          <h2 className="font-bold text-3xl md:text-left md:text-5xl">
            Goal <span className="text-primary">Tracking</span>
          </h2>
          <p className="font-medium text-xl mt-2">
            Here are your Daily Activities. Check out the exciting things you
            have
            <br />
            accomplished today and plan for more success tomorrow.
          </p>
        </div>
       <div className="">
       <WeightTrack/>
       </div>
      </div>
      {/* <Title title="Active Goal"></Title> */}
      {/* <EnduranceTracking></EnduranceTracking> */}
    </div>
  );
};

export default GoalTrackingPage;
