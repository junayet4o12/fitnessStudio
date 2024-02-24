/* eslint-disable react/prop-types */
// import React from 'react';
import { useEffect, useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { backendUrl } from "../../BackendUrl/backendUrl";
import { useNavigate } from "react-router";
import { socket } from "../../socketIo/socket";
const MessageBox = ({ userData, friendData, messages = [], refetch, scrollToTop }) => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [smoothScroll, setSmoothScroll] = useState(false)
    const chatContainerRef = useRef(null);
    const [isMessageLoading, setIsMessageLoading] = useState(false)
    useEffect(() => {
        setSmoothScroll(true)
        socket.on('refetch', (message) => {
            refetch()

        })

        // return () => {
        //     socket.disconnect();
        // }

    }, [])
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToTop]);
    useEffect(() => {

        axiosPublic.put(`/read_message?you=${userData?._id}&friend=${friendData?._id}`)
            .then(res => {
                console.log(res?.data);

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
        const sender = userData?._id;
        const receiver = friendData?._id;
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
                    setMessage('')
                    socket.emit('refetch', {
                        message,
                        time: new Date()
                    })
                    socket.emit('unread_refetch', {
                        message,
                        time: new Date()
                    })
                    refetch()
                        .then(() => {
                            setIsMessageLoading(false)
                        })


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
        navigate(-1)
    }
    const handleProfile = () => {
        navigate(`/userProfile/${friendData?.email}`)
    }
    return (
        <div className="p-5 h-[80vh] md:h-screen flex justify-center items-center text-black">
            <div className={`text-white w-full max-w-[450px] min-h-[75vh] max-h-[75vh] xl:min-h-[550px] xl:max-h-[550px] mx-auto  border-[1.5px] border-white/90 rounded-md shadow-xl relative overflow-hidden overflow-y-scroll  bg-primary/50 ${smoothScroll ? 'scroll-smooth' : ''} shadow-2xl shadow-white/30`} ref={chatContainerRef}>
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
                <div className={`p-2 space-y-2`} style={{ minHeight: `calc(75vh - 83px)` }}>
                    {
                        messages?.map(sms => <p key={sms?._id} className={`w-full flex flex-col   ${sms?.sender !== userData?._id ? 'chat chat-start' : 'chat chat-end'}`}>
                            <span className={`text-xs bmiNumber  ${sms?.sender == userData?._id ? 'ml-auto pr-3' : 'mr-auto pl-3'}`}>
                                {makeTime(sms?.time)}
                            </span>
                            <span className={`flex  items-end  gap-2 ${sms?.sender == userData?._id ? 'ml-auto pl-12 flex-row-reverse chat-end' : 'mr-auto pr-12'} chat `}>
                                <img className="w-8 h-8 object-cover rounded-full" src={sms?.sender == userData?._id ? userData?.image : friendData?.image} alt="" />
                                <span className={`chat-bubble ${sms?.sender == userData?._id ? 'chat-bubble-info bg-white/90' : 'chat-bubble-error bg-black/80 text-white'} font-medium`}>
                                    {sms.message}
                                </span>
                            </span>
                        </p>)
                    }
                </div>
                <div className="sticky bottom-0 w-full bg-primary">
                    <form onSubmit={handleSubmit} className="w-full relative">
                        <input value={message} onChange={handleChange} type="text"
                            placeholder="Message..."
                            className="input  w-full h-10 border-white rounded-none border-b-0 border-r-0 border-l-0 text-sm font-medium bg-primary/50" />
                        <button disabled={!message} className={`${!message && 'cursor-not-allowed text-gray-400'} absolute  right-1 text-xl active:scale-90 duration-200 transition-all hover:text-white   px-1.5 py-1 top-[5px]`}>
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