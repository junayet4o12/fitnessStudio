// import React from 'react';
import { useNavigate } from 'react-router-dom';
import stravaImg from '../../assets/images/strava.jpeg'
import useAxiosStrava from '../../Hooks/useAxiosStrava';
import { useEffect, useState } from 'react';
import { backendUrl } from '../../BackendUrl/backendUrl';


const Strava = () => {
    const navigate = useNavigate()
    const [exchangeCode, setExchangeCode] = useState('')
    const [isRegister, setIsRegister] = useState(localStorage.getItem('stravaKey'))
    const axiosStrava = useAxiosStrava()
    
    const handleAuthorize = async () => {
        if (exchangeCode) {
            console.log('already done', exchangeCode);
        }
        else {
            try {
                const response = await axiosStrava.get('/authorizestrava');

                if (response.status === 200) {
                    const authurl = response.data.auth
                    navigate(`//${authurl}`)
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

                setExchangeCode(code)
                axiosStrava.post(`${backendUrl}/callbackstrava`, { exchangeCode: code })
                    .then(res => {
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
    }, [exchangeCode,axiosStrava]);
   
    
    
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