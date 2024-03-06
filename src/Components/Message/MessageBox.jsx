/* eslint-disable react/prop-types */
// import React from 'react';
import { useEffect, useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { backendUrl } from "../../BackendUrl/backendUrl";
import { useNavigate } from "react-router";
import { socket } from "../../socketIo/socket";
const MessageBox = ({ userData, friendData, messages = [], refetch, scrollToTop, friendId, userId }) => {

    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [smoothScroll, setSmoothScroll] = useState(false)
    const chatContainerRef = useRef(null);
    const [isMessageLoading, setIsMessageLoading] = useState(false)
    useEffect(() => {

        socket.on('refetch', (message) => {
            refetch()
            setIsMessageLoading(false)
        })

    }, [])
    useEffect(() => {
        setSmoothScroll(false)
        // scrollToBottom();
        const addDelay = () => {

            scrollToBottom();
        }
        setTimeout(addDelay, 1);
        // console.log('hello');
    }, [friendId])
    useEffect(() => {
        // setSmoothScroll(true)
        // scrollToBottom();
        const addDelay = () => {
            setSmoothScroll(true)
            scrollToBottom();
        }
        setTimeout(addDelay, 10);
        // console.log('hello');
    }, [messages, scrollToTop]);

    console.log(smoothScroll);

    useEffect(() => {

        axiosPublic.put(`/read_message?you=${userId}&friend=${friendId}`)
            .then(res => {
                console.log(res?.data);
                socket.emit('read_unread_message', { done: 'done' })

            })
            .catch(err => {
                console.log(err?.message);
            })
    }, [messages])

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    const handleChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const sender = userId;
        const receiver = friendId;
        const time = new Date().getTime();
        const seen = false
        const messageData = {
            sender,
            receiver,
            time,
            message,
            seen
        }

        // ?sender=${userData?._id}&receiver=${friendData?._id}
        console.log(messageData);
        setIsMessageLoading(true)
        axiosPublic.post(`/send_message`, messageData)
            .then(res => {
                console.log(res.data);
                if (res?.data?.insertedId) {
                    console.log('done', messageData);
                    setMessage('')
                    socket.emit('refetch', {
                        message,
                        time: new Date(),
                        sender: userId,
                        receiver: friendId
                    })
                    socket.emit('unread_refetch', {
                        message,
                        time: new Date(),
                        sender: userId,
                        receiver: friendId
                    })
                    refetch()


                }
            })
            .catch(err => {
                console.log(err);
                setIsMessageLoading(false)
            })

    }
    const makeTime = (date) => {
        const time = new Date(date);
        const formattedTime = time.toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit'
        });
        const formattedDate = time.toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
        return `${formattedTime.split(' ')[0]} ${formattedDate.split('/')[1]}.${formattedDate.split('/')[0]}.${`${formattedDate.split('/')[2].split('')[2]}${formattedDate.split('/')[2].split('')[3]}`}`
    }
    const handleBack = () => {
        navigate('/dashboard/connected_with')
    }
    const handleProfile = () => {
        navigate(`/userProfile/${friendData?.email}`)
    }

    return (
        <div className="p-5  flex justify-center items-center text-black">
            <div className={`text-white w-full max-h-[465px] min-h-[465px] max-w-[400px]  sm:max-w-[450px] sm:min-h-[465px] sm:max-h-[465px] xl:max-h-[550px] xl:min-h-[550px] mx-auto  border-[1.5px] border-white/90 rounded-md shadow-xl relative overflow-hidden overflow-y-auto  bg-primary/50 ${smoothScroll ? 'scroll-smooth' : ''} shadow-2xl shadow-white/30`} ref={chatContainerRef}>
                <div className="w-full h-10 border-b-[1px] border-white/90 sticky top-0 z-10 bg-primary">
                    <div className="flex gap-2   px-2 items-center h-10 justify-between">


                        <div onClick={handleProfile} className="flex gap-2    items-center cursor-pointer">
                            <img title={`Go to ${friendData?.name}'s profile`} className="w-8 h-8 rounded-full object-cover  border border-black " src={friendData?.image} alt="" />
                            <span className="text-sm font-bold">{friendData?.name?.split(' ')[0]}</span>
                        </div>
                        <div>
                            <button onClick={handleBack} className="text-sm font-bold  hover:text-white active:scale-90 transition-all duration-500 mr-1 p-1">Back</button>
                        </div>
                    </div>
                </div>
                <div className={`p-2 space-y-2 messageBox`}>
                    <div className={`text-lg text-center h-[200px]  justify-center items-center 
                    ${messages?.length < 1 ? 'flex' : 'hidden'}
                    `}>You haven&apos;t engaged in <br /> any conversation yet!</div>
                    {
                        messages?.map(sms => <p key={sms?._id} className={`w-full flex flex-col   ${sms?.sender == userId ? 'chat chat-end' : 'chat chat-start'} `}>
                            <span className={`text-xs bmiNumber  
                            ${sms?.sender == userId ? 'ml-auto pr-3' : 'mr-auto pl-3'}
                            `}>
                                {makeTime(sms?.time)}
                            </span>
                            <span className={`flex  items-end  gap-2 ${sms?.sender == userId ? 'ml-auto pl-12 flex-row-reverse chat-end' : 'mr-auto pr-12'} chat `}>
                                <img className="w-8 h-8 object-cover rounded-full"
                                    src={sms?.sender == userId ? userData?.image : friendData?.image}
                                    alt="" />
                                <span className={`chat-bubble 
                                ${sms?.sender == userId && 'chat-bubble-info bg-white/90'}
                                ${sms?.receiver == userId && 'chat-bubble-error bg-black/80 text-white'}
                                 font-medium transformSingleMessage`}>
                                    {sms.message}
                                </span>
                            </span>
                        </p>)
                    }
                </div>
                <div className="sticky bottom-0  bg-primary w-full">
                    <form onSubmit={handleSubmit} className="w-full flex items-center">
                        <input value={message} onChange={handleChange} type="text"
                            placeholder="Message..."
                            className="input  w-full h-10 border-white rounded-none border-b-0 border-r-0 border-l-0 text-sm font-medium bg-primary/50 px-1" />
                        <button disabled={!message} className={`${!message && 'cursor-not-allowed text-gray-400'}   right-1 text-xl active:scale-90 duration-200 transition-all hover:text-white   px-1.5 py-1 top-[5px] bg-primary h-10 border-t border-l-[1.5px]`}>
                            {
                                isMessageLoading ? <span className="loading loading-spinner loading-xs"></span> : <IoSendSharp></IoSendSharp>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;