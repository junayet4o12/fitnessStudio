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
    const [data, setData] = useState([])
    const [comparingCard, setComparingCard] = useState([])

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
                setData(res?.data);
            })
            .catch(err => {
                console.log(err?.message);
                localStorage.removeItem('stravaKey')
                toast.error('Please Connect Strava, First')
                navigate('/dashboard/strava_connect')
            })
    }, [])
    useEffect(() => {
        axiosStravaFetch.get('/activities/10691754669', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('stravaKey')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                // console.log(res?.data);
            })
            .catch(err => {
                console.log(err?.message);
            })
    }, [])
    const handleCompare = (data) => {
        console.log(data, comparingCard[0]);
        if (comparingCard[0]?.id === data?.id || comparingCard[1]?.id === data?.id) {
            console.log('removed', comparingCard);
            const filteredData = comparingCard?.filter(datum => datum.id !== data.id);
            console.log(filteredData);
            setComparingCard(filteredData)
            // setcomparingCard1('')
            return
        }
        else if (comparingCard?.length > 1) {
            console.log('remove second and add it');
            setComparingCard([comparingCard[0], data])
            return
        }
        else if (comparingCard?.length == 1) {
            console.log('comparable');
            setComparingCard([...comparingCard, data])

            return
        }
        else {
            console.log('set');
            setComparingCard([data])

        }
    }
    const handleComparing = () => {
        navigate(`/dashboard/compare_activity/${comparingCard[0]?.id}/${comparingCard[1]?.id}`)
    }
    return (
        <div className="p-5 relative">

            <Title title={'Activities In Strava'}></Title>
            <div className={`${comparingCard.length === 0 ? ' opacity-0 scale-0' : ' opacity-100 scale-100'} w-36   bg-white/70 rounded fixed top-24 md:top-10 right-10 px-1  z-10 transition-all duration-500 border-[1.3px]  border-primary shadow-2xl shadow-primary/50 text-black`}>
                <div className="flex  flex-col justify-center items-center w-full relative pb-1">
                    <p className="text-lg font-bold ">Compare</p>
                    
                    <p className={`font-bold  text-center text-sm border-primary/70 border-t-[1.5px] border-b-[1.5px] rounded py-[2px]`}>
                        {comparingCard[0]?.name ? comparingCard[0]?.name : 'Select Another'}
                        <br />
                        vs
                        <br />
                        {comparingCard[1]?.name ? comparingCard[1]?.name : 'Select Another'}

                    </p>
                    
                    <button onClick={handleComparing} disabled={comparingCard.length !== 2} className="btn btn-sm bg-primary/40 rounded hover:bg-primary/60 transition-all duration-500 shadow-xl font-bold   mt-1">Compare</button>
                    <button onClick={() => setComparingCard([])} className='absolute top-[2px] right-1 font-bold active:scale-90 transition-all duration-300'>X</button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-7">
                {data?.map(activity => <ActivityCard key={activity?.id} activity={activity} handleCompare={handleCompare} comparingCard=
                    {comparingCard}></ActivityCard>)}
            </div>



        </div>
    );
};

export default StravaActivities;