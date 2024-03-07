import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../Loading";
import Title from "../Title/Title";
import MessageBox from "./MessageBox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "../../Redux/SingleUserSlice/singleUserSlice";
import useAuth from "../../Hooks/useAuth";

const Message = () => {
    const location = useLocation();
    const { user } = useAuth()
    const dispatch = useDispatch()
    const axiosPublic = useAxiosPublic()
    const searchqueries = new URLSearchParams(location.search)
    const { user: userData, isLoading: userDataIsLoading } = useSelector(state => state.user)
    const [scrollToTop, setScrollToTop] = useState(0)
    const queries = {};
    for (const [key, value] of searchqueries.entries()) {
        queries[key] = value;
    }
    const userId = queries?.userId1
    const friendId = queries?.userId2
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user])
    const { data: friendData, isLoading: friendDataIsLoading } = useQuery({
        queryKey: [friendId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/single_user/${friendId}`)
            setScrollToTop(scrollToTop + 1)
            return res?.data
        }
    })
    const { data: messages = [], isLoading: messageDataIsLoading, refetch } = useQuery({
        queryKey: [userId, friendId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/message_with_friend?you=${userId}&friend=${friendId}`)
            return res?.data
        }
    })
    if (userDataIsLoading || friendDataIsLoading || messageDataIsLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="pb-10 md:pb-0">
            {/* <Title title={`Chat With ${friendData?.name.split(' ')[0]}`}></Title> */}
            <div>
                <MessageBox userData={userData} friendData={friendData} messages={messages} refetch={refetch} scrollToTop={scrollToTop} friendId={friendId} userId={userId}></MessageBox>
            </div>
        </div>
    );
};

export default Message;