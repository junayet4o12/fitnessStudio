// import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import Title from "../Title/Title";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { fetchSingleUser } from "../../Redux/SingleUserSlice/singleUserSlice";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../Loading";
import FollowedMembers from "./FollowedMembers";
import FollowingMembers from "./FollowingMembers";
import { FaPlus } from "react-icons/fa6";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import FollowedMembersCircle from "./FollowedMembersCircle";
import FollowingMembersCircle from "./FollowingMembersCircle";

const ConnectedPeople = ({ children }) => {
    const dispatch = useDispatch()
    const { pathname } = useLocation();
    console.log(pathname);
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()  
    const { user, followFollowingActive, setfollowFollowingActive } = useAuth()
    const [messageWith, setMessageWith] = useState('')
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
    console.log(messageWith);
    const handleRedirect = () => {
        navigate('/dashboard/connect_people')
    }
    const addButton = <button onClick={handleRedirect} className='py-[5px] px-1 sm:px-3 font-semibold  transition-all rounded hover:rounded-md bg-blue-700  hover:bg-blue-800  text-white duration-300 active:scale-90 active:rounded-xl flex justify-center items-center gap-1 text-sm sm:text-base '><FaPlus /> Add People</button>
    return (
        <div className="p-4 overflow-x-hidden pt-8">
            <div>
                <div className="duration-300 transition-all">
                    <ul className="flex justify-center items-center gap-5 flex-wrap ">
                        <li onClick={() => setfollowFollowingActive(true)} className={`transition-all duration-500 cursor-pointer text-base font-semibold border-b-2   ${followFollowingActive ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}>Followers <span className="bmiNumber text-xs font-normal">({data.followedMembers ? data.followedMembers?.length : '0'})</span></li>
                        {/* bmiNumber */}
                        <li onClick={() => setfollowFollowingActive(false)} className={`transition-all duration-500 cursor-pointer text-base font-semibold border-b-2  ${!followFollowingActive ? ' border-primary/70' : "border-transparent"}  hover:border-primary`}> Following <span className="bmiNumber text-xs font-normal">({data.followingMembers ? data.followingMembers?.length : '0'})</span></li>
                    </ul>
                    <div className={`flex flex-col lg:flex-row `}>
                        {/* ${pathname === '/dashboard/connected_with/message' ? 'grid-cols-2' : 'grid-cols-1'} */}
                        <div className={`${pathname === '/dashboard/connected_with/message' ? 'hidden lg:block lg:w-1/2' : 'block w-full'} duration-300 transition-all max-h-[75vh] overflow-y-auto overflow-hidden mt-8`}>
                            {/* followedMembers  */}
                            <div className={`${!followFollowingActive && 'hidden'}`}>
                                

                                {
                                    (data.followedMembers).map((follower, idx) => <FollowedMembers key={follower?._id} follower={follower} idx={idx} userDetails={userDetails} setMessageWith={setMessageWith}></FollowedMembers>)
                                }

                                {
                                    data.followedMembers.length < 1 && <div className="flex justify-center items-center flex-col gap-y-3 mt-5 font-medium">
                                        Oops!!
                                        <span>You aren't followed by anyone!!</span>
                                        <span>
                                            {addButton}
                                        </span>
                                    </div>
                                }
                            </div>
                            {/* followingMembers  */}
                            <div className={`${followFollowingActive && 'hidden'}`}>
                               

                                {
                                    (data.followingMembers).map((following, idx) => <FollowingMembers key={following?._id} following={following} idx={idx} userDetails={userDetails} refetch={refetch} setMessageWith={setMessageWith}></FollowingMembers>)
                                }

                                {
                                    data.followingMembers.length < 1 && <div className="flex justify-center items-center flex-col gap-y-3 mt-5 font-medium">
                                        Oops!!
                                        <span>Nobody is followed by You!!</span>
                                        <span>
                                            {addButton}
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={`${pathname === '/dashboard/connected_with/message' ? 'block lg:hidden lg:w-1/2' : 'hidden w-full'} duration-300 transition-all mt-8`}>
                            {/* followedMembers  */}
                            <div className={`${!followFollowingActive && 'hidden'} flex  gap-2 overflow-hidden overflow-x-auto py-1`}>
                                

                                {
                                    (data.followedMembers).map((follower, idx) => <FollowedMembersCircle key={follower?._id} follower={follower} idx={idx} userDetails={userDetails} setMessageWith={setMessageWith} messageWith={messageWith}></FollowedMembersCircle>)
                                }

                                {
                                    data.followedMembers.length < 1 && <div className="flex justify-center items-center flex-col gap-y-3 mt-5 font-medium">
                                        Oops!!
                                        <span>You aren't followed by anyone!!</span>
                                        <span>
                                            {addButton}
                                        </span>
                                    </div>
                                }
                            </div>
                            {/* followingMembers  */}
                            <div className={`${followFollowingActive && 'hidden'} flex gap-2   overflow-x-auto py-1`}>
                               

                                {
                                    (data.followingMembers).map((following, idx) => <FollowingMembersCircle key={following?._id} following={following} idx={idx} userDetails={userDetails} refetch={refetch} setMessageWith={setMessageWith} messageWith={messageWith}></FollowingMembersCircle>)
                                }

                                {
                                    data.followingMembers.length < 1 && <div className="flex justify-center items-center flex-col gap-y-3 mt-5 font-medium">
                                        Oops!!
                                        <span>Nobody is followed by You!!</span>
                                        <span>
                                            {addButton}
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="duration-300 transition-all flex-1 sticky top-20 md:mt-8">
                            <Outlet />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ConnectedPeople;