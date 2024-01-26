import Activity from "./Activity";
import ExercisePlan from "./ExercisePlan";
import WeightGain from "./WeightGain";
import {Helmet} from 'react-helmet-async'
const SetGoal = () => {
  return (
    <div className="my-10 md:my-0 md:mt-10 md:mb-20">
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
