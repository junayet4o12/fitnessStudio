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
                console.log(res?.data);
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
                console.log(res?.data);
            })
            .catch(err => {
                console.log(err?.message);
            })
    }, [])
    const handleCompare = (id) => {
        if (comparingCard[0] === id) {
            console.log('removed');
            setComparingCard([])
            return
        }
        else if (comparingCard?.length > 0) {
            console.log(`compare between ${comparingCard[0]} and ${id}`);
            navigate(`/dashboard/compare_activity/${comparingCard[0]}/${id}`)
        }
        else {
            console.log('set');
            setComparingCard([...comparingCard, id])

        }
        toast.success('Compare Feature Loading....')
    }
    return (
        <div className="p-5">
            <Title title={'Activities In Strava'}></Title>
            <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-7">
                {data?.map(activity => <ActivityCard key={activity?.id} activity={activity} handleCompare={handleCompare} comparingCard=
                    {comparingCard}></ActivityCard>)}
            </div>
        </div>
    );
};

export default StravaActivities;