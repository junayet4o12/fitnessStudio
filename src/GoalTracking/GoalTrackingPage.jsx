import { Helmet } from "react-helmet-async";
import WeightTrack from "./WeightTrack";
import { useState } from "react";
import CompletedGoals from "./CompletedGoals";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
// import Title from "../Components/Title/Title";
// import EnduranceTracking from "./EnduranceTracking";

const GoalTrackingPage = () => {
  const [incomplete, setIncomplete] = useState(true)
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: completedGoals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user_goal", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user_completed_goal/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>
  }
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

        <ul className="flex justify-center items-center gap-5 flex-wrap">
          <li onClick={() => setIncomplete(true)} className={`transition-all duration-500 cursor-pointer text-sm font-semibold border-b-2   ${incomplete ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}>Incomplete <span className="bmiNumber text-xs font-normal">
            {/* ({data.followedMembers ? data.followedMembers?.length : '0'}) */}
          </span></li>
          {/* bmiNumber */}
          <li onClick={() => setIncomplete(false)} className={`transition-all duration-500 cursor-pointer text-sm font-semibold border-b-2  ${!incomplete ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}> Completed <span className="bmiNumber text-xs font-normal">
            {/* ({data.followingMembers ? data.followingMembers?.length : '0'}) */}
          </span></li>
        </ul>
        <div className={`${incomplete ? 'block' : 'hidden'}`}>
          <WeightTrack completedGoalsrefetch={refetch} />
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
