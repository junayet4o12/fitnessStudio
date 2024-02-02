// import React from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import page404 from '../../assets/images/error/404.svg'
import manhalf1 from '../../assets/images/error/manfalf1.svg'
import manhalf2 from '../../assets/images/error/manhalf2.svg'
import './Error.css'
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

const Error = () => {
    const [loading, setLoading] = useState(true)
    const error = useRouteError();

    const nevigate = useNavigate();
    const handleback = () => {
        nevigate(-1);
    }
    useEffect(() => {
        setInterval(() => {
            setLoading(false)
        }, 5000);
    }, [])
    if (loading) {
        return <div className='w-screen min-h-screen flex justify-center items-center'>

            <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
    }

    const returnBtn = `btn  errorBtn  text-white font-bold`
    return (
        <div id="error-page" className="flex flex-col lg:flex-row justify-center items-center gap-5 bg-blue-50 min-h-screen pb-7">
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>

            <div className=" items-center relative">
                <img className="w-[270px] sm:w-[400px] md:w-[500px]" src={page404} alt="" />
                <div className=" w-[115px]  sm:w-[170px] md:w-[200px] flex flex-col absolute top-10  sm:top-14 md:top-24 right-[-20px] ">
                    <img className="z-20 part1" src={manhalf1} alt="" />
                    <img className="z-10 mt-[-67px] sm:mt-[-100px] md:mt-[-110px]" src={manhalf2} alt="" />
                </div>
            </div>


            <div className="flex flex-col justify-center items-center gap-1">

                <p className="text-center text-xl font-medium">Sorry, an unexpected error has occurred.</p>
                <p className="text-center">
                    <i className="text-center text-xl font-normal">{error?.statusText || error?.message}</i>
                </p>
                <div className="text-center flex gap-3">
                    <button onClick={handleback} className={`${returnBtn} bg-[#ff4704] hover:bg-[#c63602]`}>Go back</button>
                    <Link to="/"><button className={`${returnBtn} bg-blue-500 hover:bg-blue-700`} >Go home</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Error;