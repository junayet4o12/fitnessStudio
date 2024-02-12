// import React from 'react';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
const FollowedMembers = ({ follower, idx }) => {
    console.log(idx);
    const navigate = useNavigate();
    const handleProfile = () => {
        navigate(`/dashboard/users_profile/${follower?._id}`)
    }
    return (
        <motion.div
            initial={{ scale: 0.7, x: -100 }}
            whileInView={{ scale: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.01 * idx }}
        >
            <div className="relative flex w-full max-w-[35rem] mx-auto my-4 border-b border-l-[1.5px] border-gray-700 p-[6px] rounded shadow-md shadow-primary/20 justify-between items-center ">
                <div className='flex gap-3 items-center'>
                    <img className='h-9 w-9 rounded-full' src={follower?.image} alt="" />
                    <h2 className="text-sm font-bold">{follower?.name}</h2>
                </div>
                <div>
                    <p onClick={handleProfile} className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600'>Profile</p>
                </div>
            </div>
        </motion.div>
    );
};

export default FollowedMembers;