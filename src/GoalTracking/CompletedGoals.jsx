/* eslint-disable react/prop-types */
// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { ProgressBar } from "react-loader-spinner";
import CompletedGoalsCard from "./CompletedGoalsCard";
import Loading from "../Components/Loading";

const CompletedGoals = ({completedGoals}) => {
    


    return (
        <div>
            {
                completedGoals.map(completedGoal => <CompletedGoalsCard key={completedGoal?._id} completedGoal={completedGoal}></CompletedGoalsCard>)
            }
            <div className={`card my-4 ml-0 lg:ml-28 w-full max-w-2xl bg-teal-500 text-primary-content ${!completedGoals.length <1 ? 'hidden' : 'block'} `}>
                <div className="card-body justify-center">
                    <h2 className="card-title text-center">You have not complete any goal yet!!</h2>
                    <div className="card-actions justify-center">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedGoals;