/* eslint-disable react/prop-types */
// import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion'
import { BiMessageDetail } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import UnreadMessage from './UnreadMessage';
const FollowedMembers = ({ follower, idx, userDetails,messageWith }) => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const { data: unreadMessage, isLoading: unreadMessageDataIsLoading, refetch } = useQuery({
        queryKey: [follower?._id, userDetails?._id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/unread_message?you=${userDetails?._id}&friend=${follower?._id}`)
            return res?.data
        }
    })

    const handleProfile = () => {
        navigate(`/userProfile/${follower?.email}`)

    }
    const handleMessage = () => {
        navigate(`/dashboard/connected_with/message?userId1=${userDetails?._id}&userId2=${follower?._id}`)
    }
    return (
        <motion.div
            initial={{ scale: 0.9, x: ((idx + 1) % 2 === 0 ? -50 : 50) }}
            whileInView={{ scale: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.01 * idx }}
        >
            <div className={`duration-300 transition-all relative flex w-full max-w-[35rem] mx-auto my-4 border-b border-l-[1.5px] border-gray-700 p-[6px] rounded shadow-md shadow-primary/20 justify-between items-center    ${messageWith === follower?._id ? 'searchPeople2' : 'searchPeople'}`}>
                <div className='flex gap-3 items-center'>
                    <img className='h-9 w-9 rounded-full object-cover' src={follower?.image} alt="" />
                    <h2 className="text-sm font-bold">{follower?.name}</h2>
                </div>
                <div className='flex items-center gap-2'>
                    <p onClick={handleProfile} className='btn btn-sm bg-blue-500 text-white hover:bg-blue-600 border-nones' >Profile</p>
                    <p title="Chat with him" onClick={handleMessage} className=' cursor-pointer  w-12 h-12 rounded-full  flex justify-center items-center   transition-all duration-500 ml-2 text-2xl  active:scale-90  hover:text-white hover:bg-primary/60  relative '><BiMessageDetail />
                        <UnreadMessage unreadMessage={unreadMessage} refetch={refetch} isLoading={unreadMessageDataIsLoading} userId={userDetails?._id}></UnreadMessage>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default FollowedMembers;