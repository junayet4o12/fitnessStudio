import React, { useEffect } from 'react';
import { FaFire } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../Redux/SingleUserSlice/singleUserSlice';

const CaloryAct = ({type, moving_time}) => {
    const { user } = useAuth()
    const dispatch = useDispatch()
    const { isLoading: userIsLoading, user: userDetails } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [])
    if (userIsLoading) {
        return 'Loading'
    }



    console.log(userDetails);
    let MET = 1;
    if (type === 'Walk') {
        MET = 3.5
    }
    else if (type === 'Run') {
        MET = 11
    }
    const Calories = MET * userDetails?.weight * (moving_time / 3600)
    return (
        <div className="card bg-secondary/30 mb-2">
            <div className="card-body flex flex-row justify-center bmiNumber items-center">
                <div className="card-actions justify-start">
                    <FaFire className="text-primary text-2xl" />
                </div>
                <div>
                    <p className="text-xl font-semibold">
                        Calories Burned
                    </p>
                    <span className="text-xl font-semibold">
                        {Calories.toFixed(2)} Kilo Calories
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CaloryAct;