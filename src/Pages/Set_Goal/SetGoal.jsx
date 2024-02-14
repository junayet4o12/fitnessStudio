import { useState } from "react";
import Title from "../../Components/Title/Title";
import Activity from "./Activity";
import ExercisePlan from "./ExercisePlan";
import WeightGain from "./ManageWeight";
import { Helmet } from "react-helmet-async";
const SetGoal = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isHoveredStrength, setIsHoveredStrength] = useState(false)
  const [isHoveredEndurance, setIsHoveredEndurance] = useState(false)

  return (
    <div className="my-10 md:my-4 md:mt-10 md:mb-20 px-4 lg:px-10 md:space-y-5 lg:space-y-10">
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
          <div className={`shadow-md relative bg-black rounded-lg}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <img src="https://i.ibb.co/Ct8h7sf/smiling-young-sportsman-holding-scales-apple-min.jpg" alt="" />
            <div className={`bg-blue-400 h-28 p-2 relative transition-transform duration-500 ease-in-out transform ${isHovered ? 'translate-y-[-55px]' : ''} `}>
              <h2 className="text-2xl text-white font-bold">Manage Your weight</h2>
              <p className="my-2 text-gray-300  ">Reach your target weight and improve body composition. </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                className={`text-white mx-4 hover:text-blue-60 px-3 py-2 rounded-lg mt-2 bg-primary absolute -bottom-0 ${isHovered ? 'z-10 transform transition-transform duration-500 -translate-y-2' : '-z-20'}`}
              >
                Set Goal
              </button>
            </div>

          </div>
          {/* Strength training card */}

          <div className={`shadow-md relative bg-black rounded-lg}`}
            onMouseEnter={() => setIsHoveredStrength(true)}
            onMouseLeave={() => setIsHoveredStrength(false)}>
            <img src="https://i.ibb.co/jH0HL0H/bodybuilder-seated-exercise-bench-lifting-dumbbells-controlled-by-personal-couch-min.jpg" alt="" />
            <div className={`bg-blue-400 p-2 h-28 relative transition-transform duration-500 ease-in-out transform ${isHoveredStrength ? 'translate-y-[-55px]' : ''} `}>
              <h2 className="text-2xl text-white font-bold"> Strength Training </h2>
              <p className="my-2 text-gray-300  ">Build muscle and increase strength by strength training </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                className={`text-white mx-4 hover:text-blue-60 px-3 py-2 rounded-lg mt-2 bg-primary font-bold absolute -bottom-0 ${isHoveredStrength ? 'z-10 transform transition-transform duration-500 -translate-y-2' : '-z-20'}`}
              >
                Set goal
              </button>
            </div>

          </div>
          {/* Endurance training card */}

          <div className={`shadow-md relative bg-black rounded-lg}`}
            onMouseEnter={() => setIsHoveredEndurance(true)}
            onMouseLeave={() => setIsHoveredEndurance(false)}>
            <img src="https://i.ibb.co/N2hwLX7/outdoor-shot-active-dark-skinned-man-running-morning-has-regular-trainings-dressed-tracksuit-comfort.jpg" alt="" />
            <div className={`bg-blue-400 h-28 p-2 relative transition-transform duration-500 ease-in-out transform ${isHoveredEndurance ? 'translate-y-[-55px]' : ''} `}>
              <h2 className="text-2xl text-white font-bold"> Endurance </h2>
              <p className="my-2 text-gray-300  ">Improve your cardio and stamina.</p>
            </div>
            <div className="flex items-center justify-center">
              <button
                className={`text-white mx-4 hover:text-blue-60 px-3 py-2 rounded-lg mt-2 bg-primary font-bold absolute -bottom-0 ${isHoveredEndurance ? 'z-10 transform transition-transform duration-500 -translate-y-2' : '-z-20'}`}
              >
                Set goal
              </button>
            </div>

          </div>
       
        </div>


      </div>


    </div>
  );
};

export default SetGoal;
