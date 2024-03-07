/* eslint-disable react/prop-types */
// import React from 'react';

import { useEffect } from "react";
import { socket } from "../../socketIo/socket";

const UnreadMessage = ({ unreadMessage, refetch, isLoading, userId }) => {
    useEffect(() => {
        socket.on('unread_refetch', (message) => {
            if (message?.receiver === userId) {
                refetch()
            }

        })

        // return () => {
        //     socket.disconnect();
        // }
    }, [])
    useEffect(() => {
        socket.on('read_unread_message', (message) => {
            refetch()
        })
    }, [])

    if (isLoading) {
        return <span className='absolute top-0 right-[-7px] p-0 text-xs font-bold  flex justify-center items-center w-5 h-5 bmiNumber border-[1.5px]  border-black  rounded-full '><span className="loading loading-spinner loading-xs"></span></span>
    }
    return (
        <>
            {
                unreadMessage?.count < 1 ? '' : <span className='absolute top-0 right-[-7px] p-0 text-xs font-bold  flex justify-center items-center w-5 h-5 border-black bmiNumber border-[1.5px] text-black  rounded-full '>{unreadMessage?.count}</span>
            }
        </>
    );
};

export default UnreadMessage;