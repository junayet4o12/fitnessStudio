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
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ConnectedPeople = () => {
    const dispatch = useDispatch()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
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
    const handleRedirect = () => {
        navigate('/dashboard/connect_people')
    }
    const addButton = <button onClick={handleRedirect} className='py-[5px] px-1 sm:px-3 font-semibold  transition-all rounded hover:rounded-md bg-blue-700  hover:bg-blue-800  text-white duration-300 active:scale-90 active:rounded-xl flex justify-center items-center gap-1 text-sm sm:text-base '><FaPlus /> Add People</button>
    return (
        <div className="p-4 overflow-x-hidden">
            <Title title={"The People You're connected with"}></Title>
            <ul className="flex justify-center items-center gap-5 flex-wrap">
                <li onClick={() => setfollowFollowingActive(true)} className={`transition-all duration-500 cursor-pointer text-sm font-semibold border-b-2   ${followFollowingActive ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}>Followers <span className="bmiNumber text-xs font-normal">({data.followedMembers ? data.followedMembers?.length : '0'})</span></li>
                {/* bmiNumber */}
                <li onClick={() => setfollowFollowingActive(false)} className={`transition-all duration-500 cursor-pointer text-sm font-semibold border-b-2  ${!followFollowingActive ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}> Following <span className="bmiNumber text-xs font-normal">({data.followingMembers ? data.followingMembers?.length : '0'})</span></li>
            </ul>
            {/* followedMembers  */}
            <div className={`${!followFollowingActive && 'hidden'}`}>
                <h2 className="text-xl font-bold text-center pt-4 px-3 pb-1 w-max border-b-2 border-primary mx-auto">Followed By</h2>

                {
                    (data.followedMembers).map((follower, idx) => <FollowedMembers key={follower?._id} follower={follower} idx={idx} userDetails={userDetails}></FollowedMembers>)
                }

                {
                    data.followedMembers.length < 1 && <div className="flex justify-center items-center flex-col gap-y-3 mt-5 font-medium">
                        Opps!!
                        <span>You aren't followed by anyone!!</span>
                        <span>
                            {addButton}
                        </span>
                    </div>
                }
            </div>
            {/* followingMembers  */}
            <div className={`${followFollowingActive && 'hidden'}`}>
                <h2 className="text-xl font-bold text-center pt-4 px-3 pb-1 w-max border-b-2 border-primary mx-auto">You are following</h2>

                {
                    (data.followingMembers).map((following, idx) => <FollowingMembers key={following?._id} following={following} idx={idx} userDetails={userDetails} refetch={refetch}></FollowingMembers>)
                }

                {
                    data.followingMembers.length < 1 && <div className="flex justify-center items-center flex-col gap-y-3 mt-5 font-medium">
                        Opps!!
                        <span>Nobody is followed by You!!</span>
                        <span>
                            {addButton}
                        </span>
                    </div>
                }
            </div>
        </div>
    );
};

export default ConnectedPeople;