/* eslint-disable react/prop-types */
// import React from 'react';

import { ProgressBar } from "react-loader-spinner";
import { makeVisibleTime } from "../Hooks/makeVisibleTime";

const CompletedGoalsCard = ({ completedGoal }) => {
    const day = Math.ceil((new Date(completedGoal?.timeline).getTime() - new Date().getTime()) / 86400000);
    const currentKg = completedGoal?.current_weight;
    const oldKg = completedGoal?.user_current_weight;
    return (
        <div className="my-4 ml-0 lg:ml-28">
            <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                    <span className="text-lg font-medium bmiNumber text-gray-600 dark:text-gray-400">
                        Completed Time
                        <br /> {makeVisibleTime(completedGoal?.completed_time)}
                    </span>
                    <button

                        className="px-3 py-1 text-sm font-bold  text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded animate-bounce cursor-pointer hover:bg-gray-500"
                    >
                        Completed
                    </button>
                </div>



                <div className="mt-2">
                    <h2 className="text-xl font-bold text-gray-700 hover:text-gray-600 ">
                        Tracked by Weight Management
                    </h2>
                    <h2 className="text-sm font-bold text-gray-700 hover:text-gray-600 mt-1 bmiNumber ">
                        Target Weight{" "}
                        <span className="text-primary">
                            {completedGoal?.targetWeight}
                        </span>{" "}
                        kg
                    </h2>

                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="relative flex justify-center">



                    </div>

                    <div className="flex items-center ml-1">
                        <img
                            className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                            src={completedGoal?.user_image}
                            alt="avatar"
                        />
                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                            {completedGoal?.user_name}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedGoalsCard;