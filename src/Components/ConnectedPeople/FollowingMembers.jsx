/* eslint-disable react/prop-types */
// import React from 'react';

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { RiUserUnfollowLine } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UnreadMessage from './UnreadMessage';
const FollowingMembers = ({ following, idx, userDetails, refetch,  messageWith }) => {
    const navigate = useNavigate();
    const [unFollowLoading, setUnfollowLoading] = useState(false)
    const axiosPublic = useAxiosPublic()
    const { data: unreadMessage, isLoading: unreadMessageDataIsLoading, refetch: unreadMessageRefetch } = useQuery({
        queryKey: [following?._id, userDetails?._id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/unread_message?you=${userDetails?._id}&friend=${following?._id}`)
            return res?.data
        }
    })
    const handleProfile = () => {
        navigate(`/userProfile/${following?.email}`)
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
    const handleMessage = () => {
        navigate(`/dashboard/connected_with/message?userId1=${userDetails?._id}&userId2=${following?._id}`)
    }
    return (
        <motion.div
            initial={{ scale: 0.9, x: ((idx + 1) % 2 === 0 ? -50 : 50) }}
            whileInView={{ scale: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.01 * idx }}
        >
            <div className={`duration-300 transition-all relative flex w-full max-w-[35rem] mx-auto my-4 border-b border-l-[1.5px] border-gray-700 p-[6px] rounded shadow-md shadow-primary/20 justify-between items-center    ${messageWith === following?._id ? 'searchPeople2' : 'searchPeople'}`}>
                <div className='flex gap-3 items-center'>
                    <img className='h-9 w-9 rounded-full object-cover' src={following?.image} alt="" />
                    <h2 className="text-sm font-bold">{following?.name}</h2>
                </div>
                <div className='flex items-center gap-2'>
                    <p onClick={handleProfile} className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600'>Profile</p>
                    <p onClick={handleMessage} title='Chat with him' className=' cursor-pointer  w-12 h-12 rounded-full  flex justify-center items-center   transition-all duration-500 ml-2 text-2xl  active:scale-90 hover:text-white hover:bg-primary/60  relative'><BiMessageDetail />
                        <UnreadMessage unreadMessage={unreadMessage} refetch={unreadMessageRefetch} isLoading={unreadMessageDataIsLoading} userId={userDetails?._id}></UnreadMessage>
                    </p>
                    {unFollowLoading ? <p className=' text-gray-800 w-9 h-9  flex justify-center items-center   transition-all duration-500 ml-2 text-2xl rounded-full'><span className="loading loading-spinner loading-sm"></span></p> : <p onClick={handleUnfollow} title='unfollow him' className=' cursor-pointer  w-9 h-9  flex justify-center items-center   transition-all duration-500 ml-2 text-2xl rounded-full active:scale-90  hover:text-white hover:bg-primary/60'><RiUserUnfollowLine /></p>}

                </div>
            </div>
        </motion.div>
    );
};

export default FollowingMembers;