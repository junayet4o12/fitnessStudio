/* eslint-disable react/prop-types */
// import React from 'react';

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { RiUserUnfollowLine } from "react-icons/ri";

import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useState } from 'react';
const FollowingMembers = ({ following, idx, userDetails, refetch }) => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const [unFollowLoading, setUnfollowLoading] = useState(false)
    const handleProfile = () => {
        navigate(`/dashboard/users_profile/${following?._id}`)
    }
    const handleUnfollow = () => {
        setUnfollowLoading(true)
        console.log(userDetails);
        axiosPublic.put(`/unfollowing/${userDetails?._id}`, following)
            .then(res => {
                console.log(res.data);
                refetch()
                setUnfollowLoading(false)
            })
            .catch(err => {
                console.log(err);
                setUnfollowLoading(false)
            })
    }
    return (
        <motion.div
            initial={{ scale: 0.7, x: -100 }}
            whileInView={{ scale: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.01 * idx }}
        >
            <div className="relative flex w-full max-w-[35rem] mx-auto my-4 border-b border-l-[1.5px] border-gray-700 p-[6px] rounded shadow-md shadow-primary/20 justify-between items-center ">
                <div className='flex gap-3 items-center'>
                    <img className='h-9 w-9 rounded-full' src={following?.image} alt="" />
                    <h2 className="text-sm font-bold">{following?.name}</h2>
                </div>
                <div className='flex items-center gap-2'>
                    <p onClick={handleProfile} className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600'>Profile</p>
                    {unFollowLoading ? <p className=' text-gray-800 w-9 h-9  flex justify-center items-center   transition-all duration-500 ml-2 text-2xl rounded-full'><span className="loading loading-spinner loading-sm"></span></p> : <p onClick={handleUnfollow} title='unfollow him' className=' cursor-pointer text-gray-800 w-9 h-9  flex justify-center items-center   transition-all duration-500 ml-2 text-2xl rounded-full active:scale-90 hover:text-black hover:bg-gray-200'><RiUserUnfollowLine /></p>}
                </div>
            </div>
        </motion.div>
    );
};

export default FollowingMembers;