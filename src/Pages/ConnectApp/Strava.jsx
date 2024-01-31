// import React from 'react';
import { useNavigate } from 'react-router-dom';
import stravaImg from '../../assets/images/strava.jpeg'
import useAxiosStrava from '../../Hooks/useAxiosStrava';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAxiosStravaFetch from '../../Hooks/useAxiosStravaFetch';

const Strava = () => {
    const navigate = useNavigate()
    const [exchangeCode, setExchangeCode] = useState('')
    const [isRegister, setIsRegister] = useState(localStorage.getItem('stravaKey'))
    const axiosStrava = useAxiosStrava()
    const axiosStravaFetch = useAxiosStravaFetch()
    const handleAuthorize = async () => {
        if (exchangeCode) {
            console.log('already done', exchangeCode);
        }
        else {
            try {
                const response = await axiosStrava.get('/authorizestrava');

                if (response.status === 200) {
                    const authurl = response.data.auth
                    console.log(authurl)
                    navigate(`//${authurl}`)
                    console.log('Redirecting to Fitbit for authorization');
                } else {
                    console.error('Authorization failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (!exchangeCode) {
            if (code) {

                console.log('Received authorization code:', code);
                setExchangeCode(code)
                axiosStrava.post('http://localhost:5000/callbackstrava', { exchangeCode: code })
                    .then(res => {
                        console.log(res.data.accessToken)
                        const token = res.data.accessToken
                        localStorage.setItem('stravaKey', token)
                        setIsRegister(token)
                    })
                    .catch(err => {
                        console.log(err?.message);
                    })
            }
        }
        else {
            console.log('eroi');
        }
    }, []);
   
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
    return (

        <div id="connect_app" className="lg:flex space-y-2 justify-between w-full lg:w-3/4 py-6 rounded-md shadow-lg px-4 text-gray-600 font-semibold bg-white">
            <div className="items-center flex gap-4 ">
                <img src={stravaImg} className='h-8 rounded' alt="" />
                <p className="">Strava</p>
            </div>
            <button disabled={isRegister} onClick={handleAuthorize} className="p-2 lg:p-3 text-sm lg:text-md rounded-md shadow-md bg-base-300 ml-auto">{isRegister ? 'Connected' : 'Connect'}</button>
            <br />

        </div>

    );
};

export default Strava;