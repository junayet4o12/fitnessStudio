import { Helmet } from "react-helmet-async";
import WeightTrack from "./WeightTrack";
import { useState } from "react";
import CompletedGoals from "./CompletedGoals";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import EnduranceTrack from "./EnduranceTracking";
import Loading from "../Components/Loading";
import StrengthTrainingTracking from "./StrengthTrainingTracking";
import useDailyActivities from "../Hooks/useDailyActivities";
import { Link } from "react-router-dom";
import useRandomQuotes from "../Hooks/useRandomQuotes";
// import Title from "../Components/Title/Title";

const GoalTrackingPage = () => {
  const [incomplete, setIncomplete] = useState(true)
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [weight] = useDailyActivities();
  const [quotes] = useRandomQuotes();
  const {author,quote} = quotes
  const trackingGoal = weight?.find(
    (category) => category.tracking_goal === "Weight_Management"
  );
  const specificStrengthTraining = weight?.find(
    (category) => category.tracking_goal === "Strength_training"
);
const specificEndurance = weight?.find(
  (category) => category.tracking_goal === "Endurance"
);
  const {
    data: completedGoals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user_goal_incomplete", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user_completed_goal/${user?.email}`);
      return res?.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <div className="">
      <Helmet>
        <title>Goal Tracking - FitnessStudio</title>
      </Helmet>
      <div className="space-y-4">
        <div className="flex flex-col justify-center items-center mt-4 pt-4">
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

        <ul className="flex justify-center items-center gap-5 flex-wrap  ">
          <li onClick={() => setIncomplete(true)} className={`transition-all duration-500 cursor-pointer text-base font-semibold border-b-2   ${incomplete ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}>Incomplete <span className="bmiNumber text-xs font-normal">
            {/* ({data.followedMembers ? data.followedMembers?.length : '0'}) */}
          </span></li>
          {/* bmiNumber */}
          <li onClick={() => setIncomplete(false)} className={`transition-all duration-500 cursor-pointer text-base font-semibold border-b-2  ${!incomplete ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}> Completed <span className="bmiNumber text-xs font-normal">
            {/* ({data.followingMembers ? data.followingMembers?.length : '0'}) */}
          </span></li>
        </ul>
        <div className={`${incomplete ? 'block' : 'hidden'}`}>
          {!weight.length && (
            <div className="card my-4 ml-0 lg:ml-28 w-full max-w-2xl bg-teal-500 text-primary-content">
              <div className="card-body text-center justify-center">
                <h2 className="card-title text-center"> You did set any goal yet!!!</h2>

                <p>{quote}</p>
                <blockquote className="text-end">{author !== "Unknown" && (
                 `- ${author}`
                  )}</blockquote>
                <div className="card-actions justify-center">
                  <Link to="/dashboard/set_goal">
                    <button className="btn">Set Goal</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {
            weight.length && (
              <div>
                {
                  trackingGoal && (

                    <WeightTrack completedGoalsRefetch={refetch} trackingGoal={trackingGoal}/>
                  )
                }
                {
                  specificEndurance && (

                    <EnduranceTrack completedGoalsRefetch={refetch} specificEndurance={specificEndurance}></EnduranceTrack>
                  )
                }
                {
                  specificStrengthTraining && (

                    <StrengthTrainingTracking completedGoalsRefetch={refetch} specificStrengthTraining={specificStrengthTraining}></StrengthTrainingTracking>
                  )
                }
              </div>
            )
          }


        </div>
        <div className={`${incomplete ? 'hidden' : 'block'}`}>
          <CompletedGoals completedGoals={completedGoals}></CompletedGoals>
        </div>
      </div>
      {/* <Title title="Active Goal"></Title> */}
      {/* <EnduranceTracking></EnduranceTracking> */}
    </div>
  );
};

export default GoalTrackingPage;
