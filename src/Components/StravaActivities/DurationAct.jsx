import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdAccessTime } from "react-icons/md";
const DurationAct = ({  elapsed_time }) => {
    const showingTime = elapsed_time >= 60 ? `${Math.round((elapsed_time / 60))}  min ${elapsed_time%60===0 ? '' : `${elapsed_time%60} sec`}` : `${elapsed_time} sec`
    return (
        <div className="card bg-secondary/30 mb-2">
            <div className="card-body flex flex-row justify-center bmiNumber items-center">
                <div className="card-actions justify-start">
                    <MdAccessTime className="text-primary text-2xl" />
                </div>
                <div>
                    <p className="text-xl font-semibold">
                        Duration
                    </p>
                    <span className="text-xl font-semibold">
                        {showingTime}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DurationAct;