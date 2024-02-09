import Activity from "./Activity";
import ExercisePlan from "./ExercisePlan";
import WeightGain from "./WeightGain";
import { Helmet } from "react-helmet-async";
const SetGoal = () => {
  return (
    <div className="my-10 md:my-4 md:mt-10 md:mb-20 px-4 lg:px-10 md:space-y-5 lg:space-y-10">
      <Helmet>
        <title>Set Goal - FitnessStudio</title>
      </Helmet>
      <ExercisePlan></ExercisePlan>
      <WeightGain></WeightGain>
      <Activity></Activity>
    </div>
  );
};

export default SetGoal;
