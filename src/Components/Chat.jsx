// import React from 'react';

import { useEffect, useState } from "react";
import Title from "./Title/Title";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "../Redux/SingleUserSlice/singleUserSlice";
import useAuth from "../Hooks/useAuth";
import { backendUrl } from "../BackendUrl/backendUrl";

const Chat = () => {
    const dispatch = useDispatch()
    const { user } = useAuth()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [bold, setBold] = useState(false)
    const { user: userDetails, isLoading } = useSelector(state => state.user)
    console.log(user?.email);
    const socket = io(backendUrl)
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user])
    console.log(userDetails);
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(prevMessages => [...prevMessages, message])
        })

        return () => {
            socket.disconnect();
        }
    }, [])
    const handleChange = (e) => {

        e.preventDefault();

        setMessage(e.target.value)
        setBold(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.trim() !== '') {
            socket.emit('message', {
                message,
                ...userDetails,
                time: new Date()
            })
        }
       setMessage('')
        setBold(true)

    }

    const makeTime = (date) => {
        const time = new Date(date);
        const formattedTime = time.toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit'
        });
        const formattedDate = time.toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
        return `${formattedTime.split(' ')[0]} ${formattedDate.split('/')[1]}.${formattedDate.split('/')[0]}.${formattedDate.split('/')[2]}`
    }
    return (
        <div>
            <Title title={'Realtime chat testing'}></Title>


            <div className={`font-medium my-10 flex flex-col gap-5 p-20 border-2 w-full max-w-[700px] border-primary rounded-lg mx-auto  chat chat-start`}>Sent Message : {messages.map(sms => <p key={sms} className="w-full flex flex-col">
                <span className={`text-sm  ${sms?.email === user?.email ? 'ml-auto ' : 'mr-auto'}`}>{makeTime(sms?.time)}</span>
                <span className={`flex  items-end  gap-2 ${sms?.email === user?.email ? 'ml-auto flex-row-reverse chat-end' : 'mr-auto '} chat `}>
                    <img className="w-8 h-8 object-cover rounded-full" src={sms?.image} alt="" />
                    <span className="chat-bubble chat-bubble-info max-w-[70%] ">{sms.message}</span>
                </span>
            </p>)}

            </div>
            <form onSubmit={handleSubmit} action="" className="flex justify-center items-center gap-2 sticky bottom-10 my-5">
                <textarea value={message} className="input bg-gray-700 text-white" type="text" onChange={handleChange} placeholder="Write" ></textarea>
                <button className="btn btn-neutral mx-4">Submit</button>
            </form>
        </div>
    ); 
};

export default Chat;