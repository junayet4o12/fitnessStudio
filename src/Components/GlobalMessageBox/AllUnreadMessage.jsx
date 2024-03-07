/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { socket } from "../../socketIo/socket";


const AllUnreadMessage = ({ allUnreadMessage, allUnreadMessageDataIsLoading, allUnreadMessageRefetch }) => {
    useEffect(() => {
        socket.on('unread_refetch', (message) => {
            allUnreadMessageRefetch()
        })

    }, [])
    if (allUnreadMessageDataIsLoading) {
        return <span className='absolute top-[-7px] right-[-12px] p-0 text-sm font-bold  flex justify-center items-center w-7 h-7 bmiNumber border-[2px] border-blue-700 bg-white  rounded-full text-black'><span className="loading loading-spinner loading-xs"></span></span>
    }
    return (

        <div>
            <span className={`absolute top-[-7px] right-[-12px] p-0 text-sm font-bold justify-center items-center w-7 h-7 bmiNumber border-[2px] border-blue-700 bg-white  rounded-full text-black ${allUnreadMessage?.count < 1 ? 'hidden' : 'flex'}`}>{allUnreadMessage?.count}</span>
        </div>
    );
};

export default AllUnreadMessage;