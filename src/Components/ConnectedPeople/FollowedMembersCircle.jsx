/* eslint-disable react/prop-types */
// import React from 'react';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
const FollowedMembersCircle = ({ follower, idx, userDetails,messageWith }) => {
    console.log(idx +1);
    const navigate = useNavigate()
    
    const handleMessage = () => {
        navigate(`/dashboard/connected_with/message?userId1=${userDetails?._id}&userId2=${follower?._id}`)
    }
    return (
        <motion.div
           
        >
            <div onClick={handleMessage} className={`relative flex w-max rounded-tr-full rounded-tl-full rounded-br-full  mx-auto mt-4 cursor-pointer hover:bg-black/20 duration-500 transition-all active:scale-90 p-1 pb-2      justify-between items-center text-black ${follower?._id===messageWith ? 'bg-black/20 overflow-hidden' : 'bg-transparent'}`}>
                <div className='flex gap-1 items-center flex-col'>
                    <img className='h-16 w-16 rounded-full object-cover' src={follower?.image} alt="" />
                    <h2 className="text-[10px] font-bold">{follower?.name.split(' ')[0]}</h2>
                </div>
               
            </div>
        </motion.div>
    );
};

export default FollowedMembersCircle;