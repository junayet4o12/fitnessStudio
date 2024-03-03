import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { Helmet } from 'react-helmet-async'

const HelpRequestPage = () => {
    const Axois = useAxiosPublic()
    const [Requests, setRequests] = useState([])
    useEffect(()=>{
        Axois("/help")
        .then(res=> setRequests(res.data)) 
    },[])
  return (
    <div className='p-[10px]'>
        <div className='pt-[50px] pb-[50px]'>
        <Helmet>
            <title>Manage Products - FitnessStudion</title>
        </Helmet>
        <h1 className='text-3xl font-bold mb-[10px]'>Asking for help</h1>
        <p className='font-[500]'>Lets see who needs our help in our community.</p>
      </div>
      <div className='flex flex-col gap-3 pb-[100px]'>
        {Requests.map( data =>
        <div key={data._id} className='flex flex-col md:flex-row justify-between gap-2 w-full rounded-md items-center shadow-md'>
            <img className='h-[200px] rounded-md' src={data.imageUrl}/>
            <div className="data text-left w-full flex flex-col gap-2 p-[10px]">
            <h1 className='text-xl font-bold'>{data.caption}</h1>
            <h1 className='bmiNumber'>Target: {data.amount} ৳</h1>
            <h1 className='bmiNumber'>Deadlinke: {data.deadLine} </h1>
            <h1 className='bmiNumber flex items-center gap-2 flex-wrap'>
            <img className='w-[30px] rounded-full' src={data.hostImage} alt="" /> {data.host} </h1>
            </div>
            <div className="controllers flex flex-col md:flex-row gap-2 w-full p-[10px]">
                <button className='text-xl rounded-md p-[10px] w-full bg-green-600 text-white'>Approve</button>
                <button className='text-xl rounded-md p-[10px] w-full bg-red-500 text-white'>Delete</button>
            </div>
        </div>    
        )}
      </div>
    </div>
  )
}

export default HelpRequestPage
