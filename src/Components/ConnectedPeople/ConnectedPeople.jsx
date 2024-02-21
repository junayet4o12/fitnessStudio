// import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import Title from "../Title/Title";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { fetchSingleUser } from "../../Redux/SingleUserSlice/singleUserSlice";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../Loading";
import FollowedMembers from "./FollowedMembers";
import FollowingMembers from "./FollowingMembers";

const ConnectedPeople = () => {
    const dispatch = useDispatch()
    const axiosPublic = useAxiosPublic()
    const { user, followFollowingActive, setfollowFollowingActive } = useAuth()
    const { user: userDetails } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user])
    const { data, isLoading: isPeopleListLoading, refetch } = useQuery({
        queryKey: [user],
        queryFn: async () => {
            const res = await axiosPublic.get(`/get_following_and_follower/${user?.email}`)
            return res?.data
        }
    })
    if (isPeopleListLoading) {
        return <Loading></Loading>
    }
    console.log(data);
    return (
        <div className="p-4 overflow-x-hidden  min-h-screen">
            <Title title={"The People You're connected with"}></Title>
            <ul className="flex justify-center items-center gap-5 flex-wrap">
                <li onClick={() => setfollowFollowingActive(true)} className={`transition-all duration-500 cursor-pointer text-sm font-semibold border-b-2   ${followFollowingActive ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}>Followers</li>
                <li onClick={() => setfollowFollowingActive(false)} className={`transition-all duration-500 cursor-pointer text-sm font-semibold border-b-2  ${!followFollowingActive ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}> Following</li>
            </ul>
            {/* followedMembers  */}
            <div className={`${!followFollowingActive && 'hidden'}`}>
                <h2 className="text-xl font-bold text-center pt-4 px-3 pb-1 w-max border-b-2 border-primary mx-auto">Followed By</h2>

                {
                    (data.followedMembers).map((follower, idx) => <FollowedMembers key={follower?._id} follower={follower} idx={idx} userDetails={userDetails}></FollowedMembers>)
                }
            </div>
            {/* followingMembers  */}
            <div className={`${followFollowingActive && 'hidden'}`}>
                <h2 className="text-xl font-bold text-center pt-4 px-3 pb-1 w-max border-b-2 border-primary mx-auto">You are following</h2>

                {
                    (data.followingMembers).map((following, idx) => <FollowingMembers key={following?._id} following={following} idx={idx} userDetails={userDetails} refetch={refetch}></FollowingMembers>)
                }
            </div>
        </div>
    );
};

export default ConnectedPeople;