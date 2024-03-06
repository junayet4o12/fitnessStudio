// import React from 'react';
import { BiMessageDetail } from 'react-icons/bi';
import AllUnreadMessage from './AllUnreadMessage';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
const GlobalMessageBox = ({ userId }) => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: allUnreadMessage, isLoading: allUnreadMessageDataIsLoading, refetch: allUnreadMessageRefetch } = useQuery({
        queryKey: [userId],
        enabled: !!userId,
        queryFn: async () => {
            const res = await axiosPublic.get(`/all_unread_message_count?you=${userId}`)
            return res?.data
        }
    })
    console.log(allUnreadMessage, userId, allUnreadMessage?.result);
    return (
        <div className='p-3 text-3xl bg-blue-700 text-white rounded-full hover:bg-blue-900 transition-all duration-300 cursor-pointer active:scale-90 '>
            <div className='messageButton'>
                <BiMessageDetail />
            </div>
            <span>
                <AllUnreadMessage allUnreadMessage={allUnreadMessage} allUnreadMessageDataIsLoading={allUnreadMessageDataIsLoading} allUnreadMessageRefetch={allUnreadMessageRefetch} />
            </span>
        </div>
    );
};

export default GlobalMessageBox;