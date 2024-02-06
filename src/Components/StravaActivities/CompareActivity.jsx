// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosStravaFetch from "../../Hooks/useAxiosStravaFetch";
import Title from "../Title/Title";
import { InfinitySpin } from 'react-loader-spinner';

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
        return <div className='h-screen flex items-center justify-center'>
            {/* <Spinner className="h-16 w-16 text-gray-900/50" /> */}
            <InfinitySpin
                visible={true}
                width="300"
                color="#FF4804"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    }
    console.log(data1, data2);
    // Distance KiloMeter To Meter
    const distanceInKm1 = parseFloat((data1?.distance / 1000).toFixed(2))
    const showingDistance1 = distanceInKm1 < 0.5 ? `${data1?.distance} meter` : `${distanceInKm1} Kilometer`
    const distanceInKm2 = parseFloat((data2?.distance / 1000).toFixed(2))
    const showingDistance2 = distanceInKm2 < 0.5 ? `${data2?.distance} meter` : `${distanceInKm2} Kilometer`

    // Minutes To Second
    const showingTime1 = data1?.moving_time >= 60 ? `${Math.round((data1?.moving_time / 60))}  min ${data1?.moving_time % 60 === 0 ? '' : `${data1?.moving_time % 60} sec`}` : `${data1?.moving_time} sec`
    const showingTime2 = data2?.moving_time >= 60 ? `${Math.round((data2?.moving_time / 60))}  min ${data2?.moving_time % 60 === 0 ? '' : `${data2?.moving_time % 60} sec`}` : `${data2?.moving_time} sec`;

    // Time and Date formate
    const time1 = new Date(data1?.start_date);
    const formattedTime1 = time1.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit'
    });
    const formattedDate1 = time1.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

    const time2 = new Date(data2?.start_date);
    const formattedTime2 = time2.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit'
    });
    const formattedDate2 = time2.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <>
            <Title title={'Compare Between two Activity'}></Title>
            <div>
                {/* image and timeline */}
                <ul className="timeline timeline-vertical px-2">
                    <li className="gap-2">
                        <div className="timeline-start timeline-box">
                            <img className="md:h-64 md:w-64 lg:h-96 lg:w-72 rounded-md" src={data1?.photos?.primary?.urls[600]} alt="Photo" />
                        </div>
                        <hr />
                        <div className="timeline-middle">
                            <p className="border rounded-full py-1 px-[6px] border-primary font-bold text-gray-500">VS</p>
                        </div>
                        <div className="timeline-end timeline-box">
                            <img className="md:h-64 md:w-64 lg:h-96 lg:w-72 rounded-md" src={data2?.photos?.primary?.urls[600]} alt="Photo" />
                        </div>
                        <hr />
                    </li>
                </ul>
                {/* compare names */}
                <div className="flex gap-4 lg:gap-8 justify-center items-center text-xl md:text-3xl lg:text-4xl font-bold py-2">
                    <div>
                        <p>{data1?.name}</p>
                        <h1 className="bmiNumber text-xs md:text-sm text-center py-2">{formattedTime1}{formattedDate1}</h1>
                    </div>
                    <p className="text-primary font-extrabold">VS</p>
                    <div>
                        <p>{data2?.name}</p>
                        <h1 className="bmiNumber text-xs md:text-sm text-center py-2">{formattedTime2}{formattedDate2}</h1>
                    </div>
                </div>

                {/* Compare Table */}
                <div className="overflow-x-auto mx-6 my-12 p-2 border-x border-b border-primary rounded-md shadow-xl">
                    <table className="table bmiNumber">
                        <thead>
                            <tr className="text-sm md:text-lg lg:text-xl text-black font-bold">
                                <th>Activities</th>
                                <th>{data1?.name}</th>
                                <th>{data2?.name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Distance</th>
                                <td>{showingDistance1}</td>
                                <td>{showingDistance2}</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Active Time</th>
                                <td>{showingTime1}</td>
                                <td>{showingTime2}</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Average Speed</th>
                                <td>{(data1?.average_speed * 1.60934).toFixed(2)} km/h</td>
                                <td>{(data2?.average_speed * 1.60934).toFixed(2)} km/h</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Max Speed</th>
                                <td>{(data1?.max_speed * 1.60934).toFixed(2)} km/h</td>
                                <td>{(data2?.max_speed * 1.60934).toFixed(2)} km/h</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Elev High</th>
                                <td>{data1?.elev_high}</td>
                                <td>{data2?.elev_high}</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Elev Low</th>
                                <td>{data1?.elev_low}</td>
                                <td>{data2?.elev_low}</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Tracking Type</th>
                                <td>{data1?.sport_type}</td>
                                <td>{data2?.sport_type}</td>
                            </tr>
                            <tr className="hover">
                                <th className="text-xs md:text-sm">Country</th>
                                <td>{data1?.location_country}</td>
                                <td>{data2?.location_country}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CompareActivity;