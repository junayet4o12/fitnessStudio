import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2'

const SingleDonationPage = () => {
    const [data, setData] = useState(useLoaderData().data)
    const [load, setloader] = useState(false)

    const shareFunction = ()=>{
      navigator.clipboard.writeText(window.location.href)
      Swal.fire({
          title:"Copyed the link",
          icon:"success"
      })
    }

  return (
    <div className='p-[10px] container'>
        <h1 className='text-4xl font-bold pt-[50px] pb-[25px]'>{data[0].caption}</h1>
      <div className='flex flex-col md:flex-row gap-2 items-start mb-[25px]'>
        <div className='w-full md:w-[65vw]'>
            <img className='rounded-md w-full' src={data[0].imageUrl} alt="" />
        </div>
        <div className='rounded-md shadow-md w-full md:w-[35vw] p-[20px] bmiNumber flex flex-col items-center gap-4 sticky top-40'>
            <h1> <span className='text-4xl font-[500]'>{data[0].Raised}৳</span> raised out of {data[0].amount}৳ Goal</h1>
            <h1> <span className='text-xl font-[500]'>Expires in: {data[0].deadLine}</span></h1>
            <div 
            className={`w-[${(data[0].amount/100)*data[0].Raised}%] h-[4px] rounded-lg bg-black items-start`}
            ></div>
            <button 
            onClick={shareFunction}
            className='bg-secondary text-white text-xl rounded-md p-[10px] w-full'>Share</button>
            <button className='bg-secondary text-white text-xl rounded-md p-[10px] w-full'>Donate</button>
        </div>
      </div>
      <div className='p-[20px] flex flex-col gap-3'>
        <p className='text-2xl font-[600]'>Story</p>
        <p className='font-[500]'>{data[0].story}</p>
      </div>
    </div>
  )
}

export default SingleDonationPage
