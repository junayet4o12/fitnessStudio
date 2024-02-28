// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import stravaImg from '../../../assets/images/strava.jpeg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAxiosStrava from '../../../Hooks/useAxiosStrava';
// import useAxiosStravaFetch from '../../Hooks/useAxiosStravaFetch';

const Strava = () => {
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(localStorage.getItem('stravaKey'))




    // const handleGetData = () => {
    //     console.log('hello', localStorage.getItem('stravaKey'));
    //     axiosStravaFetch.get('/athlete/activities', {
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('stravaKey')}`,
    //             'Content-Type': 'application/json'
    //         }
    //     }) 
    //     .then(res=> {
    //         console.log(res?.data);
    //     })
    //     .catch(err=> {
    //         console.log(err?.message);
    //         localStorage.removeItem('stravaKey')
    //     })
    // }
    
    const handleNavigate = () => {
        navigate('/dashboard/strava_connect')
    }
    return (

        <div id="connect_app" className="lg:flex space-y-2 justify-between w-full lg:w-3/4 py-6 rounded-md shadow-lg px-4 text-gray-600 font-semibold bg-white">
            <div className="items-center flex gap-4 ">
                <img src={stravaImg} className='h-8 rounded' alt="" />
                <p className="">Strava</p>
            </div>
            {
                isRegister ? <button
                    disabled
                    // onClick={handleAuthorize}
                    className="p-2 lg:p-3 text-sm lg:text-md rounded-md shadow-md bg-base-300 ml-auto"
                >Connected</button> :

                    <button
                        onClick={handleNavigate}
                        className="p-2 lg:p-3 text-sm lg:text-md rounded-md shadow-md bg-base-300 ml-auto"
                    // disabled={isRegister}
                    // onClick={handleAuthorize}
                    >Connect</button>

            }
            <br />

        </div>

    );
};

export default Strava;