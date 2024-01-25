import Activity from "./Activity";
import ExercisePlan from "./ExercisePlan";
import WeightGain from "./WeightGain";

const SetGoal = () => {
  return (
    <div className="my-10 md:my-0 md:mt-10 md:mb-20">
      <ExercisePlan></ExercisePlan>
      <WeightGain></WeightGain>
      <Activity></Activity>
    </div>
  );
};

export default SetGoal;
