// import React from 'react';

import { useEffect, useState } from "react";
import useAxiosStravaFetch from "../../Hooks/useAxiosStravaFetch";
import Title from "../Title/Title";
import ActivityCard from "./ActivityCard";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";


// 24bfe6b14cf5aac27ead2123f81cfa7ee20785b1
const StravaActivities = () => {
    const navigate = useNavigate()
    const axiosStravaFetch = useAxiosStravaFetch()
    const [activityData, setActivityData] = useState([])
    const [comparingCardsData, setComparingCardsData] = useState([])

    // fetching strava activity data 
    useEffect(() => {
        if (!localStorage.getItem('stravaKey')) {
            toast.error('Please Connect Strava, First')
            navigate('/dashboard/strava_connect')
            return
        }
        axiosStravaFetch.get('/athlete/activities', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('stravaKey')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                // console.log(res?.data);
                setActivityData(res?.data);
            })
            .catch(err => {
                console.log(err?.message);
                localStorage.removeItem('stravaKey')
                toast.error('Please Connect Strava, First')
                navigate('/dashboard/strava_connect')
            })
    }, [])
    // functionality for showing and setting comparing activities data in compare form (start) 
    const handleGivingCompareDate = (data) => {
        // for checking that the clicked card is available in state. if available it will remove from the state 
        if (comparingCardsData[0]?.id === data?.id || comparingCardsData[1]?.id === data?.id) {
            console.log('removed');
            const filteredData = comparingCardsData?.filter(datum => datum.id !== data.id);
            console.log(filteredData);
            setComparingCardsData(filteredData)
            return
        }
        // if state have 2 data in array the second one will replace by the clicked one 
        else if (comparingCardsData?.length > 1) {
            console.log('remove second and add it');
            setComparingCardsData([comparingCardsData[0], data])
            return
        }
        // if state have one data the clicked one will be stored in state 
        else if (comparingCardsData?.length == 1) {
            console.log('comparable');
            setComparingCardsData([...comparingCardsData, data])

            return
        }
        // if state dont have any data it will stored in state 
        else {
            console.log('set');
            setComparingCardsData([data])

        }
    }
    // functionality for showing and setting comparing activities data in compare form (end)
    const handleNavigateToComparingPage = () => {
        navigate(`/dashboard/compare_activity/${comparingCardsData[0]?.id}/${comparingCardsData[1]?.id}`)
    }
    return (
        <div className="p-5 relative max-w-7xl mx-auto container">
            <div className={`${comparingCardsData.length === 0 ? ' opacity-0 scale-0' : ' opacity-100 scale-100'} w-36 h-[180px] flex justify-center items-center   bg-white/70 rounded sticky top-24 md:top-10 right-10 ml-auto px-1  z-10 transition-all duration-500 border-[1.3px]  border-primary shadow-2xl shadow-primary/50 text-black`}>
                <div className="flex  flex-col justify-center items-center w-full relative pb-1">
                    <p className="text-lg font-bold ">Compare</p>

                    <p className={`font-bold  text-center text-sm border-primary/70 border-t-[1.5px] border-b-[1.5px] rounded py-[2px]`}>
                        {comparingCardsData[0]?.name ? comparingCardsData[0]?.name : 'Select Another'}
                        <br />
                        vs
                        <br />
                        {comparingCardsData[1]?.name ? comparingCardsData[1]?.name : 'Select Another'}

                    </p>

                    <button onClick={handleNavigateToComparingPage} disabled={comparingCardsData.length !== 2} className="btn btn-sm bg-primary/40 rounded hover:bg-primary/60 transition-all duration-500 shadow-xl font-bold   mt-1">Compare</button>
                    <button onClick={() => setComparingCardsData([])} className='absolute top-[2px] right-1 font-bold active:scale-90 transition-all duration-300'>X</button>
                </div>
            </div>
            <div className=" mt-[-140px]">
                <Title title={'Activities In Strava'}></Title>

                <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-7 ">
                    {activityData?.map(activity => <ActivityCard key={activity?.id} activity={activity} handleGivingCompareDate={handleGivingCompareDate} comparingCard=
                        {comparingCardsData}></ActivityCard>)}
                </div>
            </div>



        </div>
    );
};

export default StravaActivities;