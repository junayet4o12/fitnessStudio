import React from 'react';
import { FaCarSide } from 'react-icons/fa';

const DistanceAct = ({distance}) => {
    const distanceInKm = parseFloat((distance / 1000).toFixed(2))
    const showingDistance = distanceInKm < 0.5 ? `${distance} meter` : `${distanceInKm} Kilometer`
    return (
        <div className="card bg-primary/20 mb-2">
            <div className="card-body flex flex-row justify-center bmiNumber items-center">
                <div className="card-actions justify-start">
                    <FaCarSide className="text-primary text-2xl" />
                </div>
                <div>
                    <p className="text-xl font-semibold">
                        Distance
                    </p>
                    <span className="text-xl font-semibold">
                        {showingDistance}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DistanceAct;