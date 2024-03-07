// import React from 'react';

import { useEffect, useState } from "react";
import useAxiosStravaFetch from "../../Hooks/useAxiosStravaFetch";
import Title from "../Title/Title";
import ActivityCard from "./ActivityCard";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import StravaActivityTutorial from "./StravaActivityTutorial";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";


// 24bfe6b14cf5aac27ead2123f81cfa7ee20785b1
const StravaActivities = () => {
    const navigate = useNavigate()
    const axiosStravaFetch = useAxiosStravaFetch()
    const [comparingCardsData, setComparingCardsData] = useState([])

    // fetching strava activity data 

    const { data: activityData, isLoading: isactivityDatasLoading, isError } = useQuery({
        queryKey: [localStorage.getItem('stravaKey')],
        queryFn: async () => {
            const res = await axiosStravaFetch.get('/athlete/activities', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('stravaKey')}`,
                    'Content-Type': 'application/json'
                }
            })
            return res.data
        }
    })
    if (isactivityDatasLoading) {
        return <Loading></Loading>
    }
    if (isError) {
        localStorage.removeItem('stravaKey')
        toast.error('Please Connect Strava, First')
        navigate('/dashboard/strava_connect')
    }
    // functionality for showing and setting comparing activities data in compare form (start) 
    const handleGivingCompareDate = (data) => {
        // for checking that the clicked card is available in state. if available it will remove from the state 
        if (comparingCardsData[0]?.id === data?.id || comparingCardsData[1]?.id === data?.id) {
            const filteredData = comparingCardsData?.filter(datum => datum.id !== data.id);
            setComparingCardsData(filteredData)
            return
        }
        // if state have 2 data in array the second one will replace by the clicked one 
        else if (comparingCardsData?.length > 1) {
            setComparingCardsData([comparingCardsData[0], data])
            return
        }
        // if state have one data the clicked one will be stored in state 
        else if (comparingCardsData?.length == 1) {
            setComparingCardsData([...comparingCardsData, data])

            return
        }
        // if state dont have any data it will stored in state 
        else {
            setComparingCardsData([data])

        }
    }
    // functionality for showing and setting comparing activities data in compare form (end)
    const handleNavigateToComparingPage = () => {
        navigate(`/dashboard/compare_activity/${comparingCardsData[0]?.id}/${comparingCardsData[1]?.id}`)
    }
    return (
        <div className="p-5 relative max-w-7xl mx-auto container">
            <div className={`${comparingCardsData.length === 0 ? ' opacity-0 scale-0' : ' opacity-100 scale-100'} w-36 h-[180px] flex justify-center items-center   bg-gradient-to-r from-primary/50 to-primary/80 rounded fixed top-24 md:top-10 right-10 ml-auto px-1  z-10 transition-all duration-500 border-[1.3px]  border-primary shadow-2xl shadow-primary/50 text-gray-100`}>
                <div className="flex  flex-col justify-center items-center w-full relative pb-1">
                    <p className="text-lg font-bold ">Compare</p>

                    <p className={`font-bold  text-center text-sm border-primary/70 border-t-[1.5px] border-b-[1.5px] rounded py-[2px]`}>
                        {comparingCardsData[0]?.name ? comparingCardsData[0]?.name : 'Select Another'}
                        <br />
                        vs
                        <br />
                        {comparingCardsData[1]?.name ? comparingCardsData[1]?.name : 'Select Another'}

                    </p>

                    <button onClick={handleNavigateToComparingPage} disabled={comparingCardsData.length !== 2} className="btn btn-sm bg-primary/70 text-gray-200 hover:text-black rounded hover:bg-primary/9 0 transition-all duration-500 shadow-xl border-none font-bold   mt-1">Compare</button>
                    <button onClick={() => setComparingCardsData([])} className='absolute top-[2px] right-1 font-bold active:scale-90 transition-all duration-300'>X</button>
                </div>
            </div>
            <div className=" ">
                <Title title={'Activities In Strava'}></Title>

                <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-7 ">
                    {activityData?.map(activity => <ActivityCard key={activity?.id} activity={activity} handleGivingCompareDate={handleGivingCompareDate} comparingCard=
                        {comparingCardsData}></ActivityCard>)}
                </div>

                <div className={`${activityData.length <= 0 ? 'block' : 'hidden'}`}>

                    <StravaActivityTutorial></StravaActivityTutorial>
                </div>
            </div>



        </div>
    );
};

export default StravaActivities;