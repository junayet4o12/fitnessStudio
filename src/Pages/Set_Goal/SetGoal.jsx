import Activity from "./Activity";
import ExercisePlan from "./ExercisePlan";
import WeightGain from "./WeightGain";

const SetGoal = () => {
  return (
    <div className="mt-10 mb-20">
      <ExercisePlan></ExercisePlan>
      <WeightGain></WeightGain>
      <Activity></Activity>
    </div>
  );
};

export default SetGoal;
