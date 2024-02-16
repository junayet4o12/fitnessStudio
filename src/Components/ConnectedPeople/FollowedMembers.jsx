// import React from 'react';
import { motion } from 'framer-motion'
import { BiMessageDetail } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
const FollowedMembers = ({ follower, idx, userDetails }) => {
    console.log(idx);
    const navigate = useNavigate();
    const handleProfile = () => {
        navigate(`/blogs/blogs/${follower?.email}`)

    }
    const handleMessage = () => {
        navigate(`/dashboard/message?userId1=${userDetails?._id}&userId2=${follower?._id}`)
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
                <div className='flex items-center gap-2'>
                    <p onClick={handleProfile} className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600'>Profile</p>
                    <p title="Chat with him" onClick={handleMessage}  className=' cursor-pointer text-gray-800 w-9 h-9  flex justify-center items-center   transition-all duration-500 ml-2 text-2xl rounded-full active:scale-90 hover:text-black hover:bg-gray-200'><BiMessageDetail /></p>
                </div>
            </div>
        </motion.div>
    );
};

export default FollowedMembers;