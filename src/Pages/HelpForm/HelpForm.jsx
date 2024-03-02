import React from 'react'

const HelpForm = () => {
  return (
    <div className='p-[10px] flex flex-col gap-4 mt-[25px] mb-[50px]'>
      <h1 className='text-4xl font-[600]'>Ask for help</h1>
      <p className='font-[500]'>Give a brief information about your situation in the form below.</p>
      <form
      className='flex flex-col items-start gap-3'
      >
        <input
        className='text-xl p-[10px] outline-none font-[500] w-full border-b-2 border-secondary'
        type="file" name="" id="" />
        <input
        className='text-xl p-[10px] outline-none font-[500] w-full border-b-2 border-secondary'
        type="text" placeholder='Caption' />
        <input
        className='bmiNumber text-xl p-[10px] outline-none font-[500] w-full border-b-2 border-secondary'
        type="text" placeholder='Aim for  ৳ 0.00' />
        <textarea
        className='text-xl p-[10px] outline-none font-[500] min-h-[300px] max-h-[300px] w-full border-b-2 border-secondary'
        type="text" placeholder='Story' />
        <input
        className='text-xl bg-secondary text-white p-[10px] rounded-md'
        type="submit" value="Submit requst" />
      </form>
    </div>
  )
}

export default HelpForm
