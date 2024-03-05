/* eslint-disable react/prop-types */
// import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion'
import { BiMessageDetail } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import UnreadMessage from './UnreadMessage';
const FollowedMembersCircle = ({ follower, idx, userDetails,setMessageWith,messageWith }) => {
    console.log(idx +1);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const { data: unreadMessage, isLoading: unreadMessageDataIsLoading, refetch } = useQuery({
        queryKey: [follower?._id, userDetails?._id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/unread_message?you=${userDetails?._id}&friend=${follower?._id}`)
            return res?.data
        }
    })

    console.log(unreadMessage);
    const handleProfile = () => {
        navigate(`/userProfile/${follower?.email}`)

    }
    const handleMessage = () => {
        setMessageWith(follower?._id)
        navigate(`/dashboard/connected_with/message?userId1=${userDetails?._id}&userId2=${follower?._id}`)
    }
    return (
        <motion.div
           
        >
            <div onClick={handleMessage} className={`relative flex w-max rounded-3xl mx-auto mt-4 cursor-pointer hover:bg-black/20 duration-500 transition-all active:scale-90 pb-1 px-1    justify-between items-center text-black ${follower?._id===messageWith ? 'bg-black/20' : 'bg-transparent'}`}>
                <div className='flex gap-1 items-center flex-col'>
                    <img className='h-16 w-16 rounded-full object-cover' src={follower?.image} alt="" />
                    <h2 className="text-sm font-bold">{follower?.name.split(' ')[0]}</h2>
                </div>
               
            </div>
        </motion.div>
    );
};

export default FollowedMembersCircle;