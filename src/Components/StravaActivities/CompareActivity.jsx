// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosStravaFetch from "../../Hooks/useAxiosStravaFetch";
import Title from "../Title/Title";

const CompareActivity = () => {
    const { id1, id2 } = useParams();
    const axiosStravaFetch = useAxiosStravaFetch()
    console.log(id1, id2);
    const { data: data1, isLoading: isLoading1 } = useQuery({
        queryKey: ['compare', id1],
        queryFn: async () => {
            const res = await axiosStravaFetch.get(`/activities/${id1}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('stravaKey')}`,
                    'Content-Type': 'application/json'
                }
            })
            return res?.data
        }
    })
    const { data: data2, isLoading: isLoading2 } = useQuery({
        queryKey: ['compare', id2],
        queryFn: async () => {
            const res = await axiosStravaFetch.get(`/activities/${id2}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('stravaKey')}`,
                    'Content-Type': 'application/json'
                }
            })
            return res?.data
        }
    })
    if (isLoading1 || isLoading2) {
        return 'loading'
    }
    console.log(data1, data2);
    return (
        <div>
            <Title title={'Compare Between two Activity'}></Title>
            <div>
                {data1?.name} vs {data2?.name}
            </div>
        </div>
    );
};

export default CompareActivity;