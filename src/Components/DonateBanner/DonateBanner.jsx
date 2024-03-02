import React from 'react'
import { Link } from 'react-router-dom'

const DonateBanner = () => {
  return (
    <div className='bonateBanner flex flex-col items-center pt-[100px] md:pt-[0px] md:justify-center text-center gap-5'>
      <h1 className='text-5xl font-bold'>Give Today, <br/> Inspire Tomorrow</h1>
      <Link to="/dashboard/helpForm">
        <button className='p-[20px] text-xl bg-white rounded-full'>Ask for help</button>
      </Link>
    </div>
  )
}

export default DonateBanner
