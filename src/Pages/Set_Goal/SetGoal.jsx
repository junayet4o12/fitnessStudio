import Title from "../../Components/Title/Title";
// import Activity from "./Activity";
import ExercisePlan from "./ExercisePlan";
// import WeightGain from "./ManageWeight";
import { Helmet } from "react-helmet-async";
import GoalCard from "../../Components/GoalCard/GoalCard";
const SetGoal = () => {
 

  return (
    <div className=" px-4  py-10 pb-20">
      <Helmet>
        <title>Set Goal - FitnessStudio</title>
      </Helmet>
      <ExercisePlan></ExercisePlan>
      {/* <WeightGain></WeightGain>
      <Activity></Activity> */}
      <div>
        <Title title="Select Goal Category"></Title>
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Manage weight card */}
          <GoalCard title={'Weight Management'} image={'https://i.ibb.co/Ct8h7sf/smiling-young-sportsman-holding-scales-apple-min.jpg'} description={'Reach your target weight and improve body composition.'} category={'weightManagement'}></GoalCard>

          {/* Strength training card */}
          <GoalCard title={'Strength Training'} image={'https://i.ibb.co/jH0HL0H/bodybuilder-seated-exercise-bench-lifting-dumbbells-controlled-by-personal-couch-min.jpg'} description={'Build muscle and increase strength by strength training '} category={'strengthTraining'}></GoalCard>

          {/* Endurance training card */}
          <GoalCard title={'Endurance'} image={'https://i.ibb.co/N2hwLX7/outdoor-shot-active-dark-skinned-man-running-morning-has-regular-trainings-dressed-tracksuit-comfort.jpg'} description={'Improve your cardio and stamina.'} category={'endurance'}></GoalCard>
        </div>
      </div>


    </div>
  );
};

export default SetGoal;
