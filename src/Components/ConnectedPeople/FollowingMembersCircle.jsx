/* eslint-disable react/prop-types */
// import React from 'react';

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
const FollowingMembersCircle = ({ following, idx, userDetails, refetch,  messageWith }) => {
    const navigate = useNavigate()
   
    const handleMessage = () => {
        navigate(`/dashboard/connected_with/message?userId1=${userDetails?._id}&userId2=${following?._id}`)
    }
    console.log(following?._id == messageWith);
    return (
        <motion.div

        >
            <div onClick={handleMessage} className={`relative flex w-max rounded-3xl mx-auto mt-4 cursor-pointer hover:bg-black/20 duration-500 transition-all active:scale-90 pb-1 px-1    justify-between items-center text-black ${following?._id === messageWith ? 'bg-black/20' : 'bg-transparent'}`}>
                <div className='flex gap-1 items-center flex-col'>
                    <img className='h-16 w-16 rounded-full object-cover' src={following?.image} alt="" />
                    <h2 className="text-sm font-bold">{following?.name.split(' ')[0]}</h2>
                </div>

            </div>
        </motion.div>
    );
};

export default FollowingMembersCircle;