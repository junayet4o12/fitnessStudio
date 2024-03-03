import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleDonationPage = () => {
    const data = useLoaderData().data
    console.log(data);
  return (
    <div className='p-[10px] container'>
        <h1 className='text-4xl font-bold pt-[50px] pb-[25px]'>{data[0].caption}</h1>
      <div className='flex flex-col md:flex-row gap-2 items-start mb-[25px]'>
        <div className='w-full md:w-[65vw]'>
            <img className='rounded-md w-full' src={data[0].imageUrl} alt="" />
        </div>
        <div className='rounded-md shadow-md w-full md:w-[35vw] p-[20px] bmiNumber flex flex-col items-center gap-4 sticky top-20'>
            <h1> <span className='text-4xl font-[500]'>{data[0].Raised}৳</span> raised out of {data[0].amount}৳ Goal</h1>
            <button className='bg-secondary text-white text-xl rounded-md p-[10px] w-full'>Share</button>
            <button className='bg-secondary text-white text-xl rounded-md p-[10px] w-full'>Donate</button>
        </div>
      </div>
      <p className='text-xl font-[600]'>Story</p>
      <p>{data[0].story}</p>
    </div>
  )
}

export default SingleDonationPage
