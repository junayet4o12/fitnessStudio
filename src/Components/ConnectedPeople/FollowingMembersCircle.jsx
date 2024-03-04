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
const FollowingMembersCircle = ({ following, idx, userDetails, refetch, setMessageWith, messageWith }) => {
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
        setMessageWith(following?._id)
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