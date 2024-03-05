import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../Loading";
import Title from "../Title/Title";
import MessageBox from "./MessageBox";
import { useState } from "react";

const Message = () => {
    const location = useLocation();
    const axiosPublic = useAxiosPublic()
    const searchqueries = new URLSearchParams(location.search)
    const [scrollToTop, setScrollToTop] = useState(0)
    const queries = {};
    for (const [key, value] of searchqueries.entries()) {
        queries[key] = value;
    }
    const userId = queries?.userId1
    const friendId = queries?.userId2
    const { data: userData, isLoading: userDataIsLoading } = useQuery({
        queryKey: [userId],
        enabled: !!userId ,
        queryFn: async () => {
            const res = await axiosPublic.get(`/single_user/${userId}`)
            return res?.data
        }
    })
    const { data: friendData, isLoading: friendDataIsLoading } = useQuery({
        queryKey: [friendId],
        enabled: !!friendId,
        queryFn: async () => {
            const res = await axiosPublic.get(`/single_user/${friendId}`)
            setScrollToTop(scrollToTop + 1)
            return res?.data
        }
    })
    const { data: messages=[], isLoading: messageDataIsLoading, refetch } = useQuery({
        queryKey: [userId, friendId],
        enabled: !!userId,
        queryFn: async () => {
            const res = await axiosPublic.get(`/message_with_friend?you=${userId}&friend=${friendId}`)
            return res?.data
        }
    })
    if (userDataIsLoading || friendDataIsLoading || messageDataIsLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            {/* <Title title={`Chat With ${friendData?.name.split(' ')[0]}`}></Title> */}
            <div>
                <MessageBox userData={userData} friendData={friendData} messages={messages} refetch={refetch} scrollToTop={scrollToTop} friendId={friendId}></MessageBox>
            </div>
        </div>
    );
};

export default Message;