import React from 'react';
import { FaRunning } from 'react-icons/fa';
 
const MovingTimeAct = ({ moving_time}) => {
    const showingTime = moving_time >= 60 ? `${Math.round((moving_time / 60))}  min ${moving_time%60===0 ? '' : `${moving_time%60} sec`}` : `${moving_time} sec`
    return (
        <div className="card bg-primary/20 mb-2">
            <div className="card-body flex flex-row justify-center bmiNumber items-center">
                <div className="card-actions justify-start">
                    <FaRunning className="text-primary text-2xl" />
                </div>
                <div>
                    <p className="text-xl font-semibold">
                        Active Time
                    </p>
                    <span className="text-xl font-semibold">
                        {showingTime}
                    </span>
                </div>
            </div>
        </div>
    );
   
};

export default MovingTimeAct;