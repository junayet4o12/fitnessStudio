import React from 'react'

const WhyChooseUs = () => {
  return (
    <div className='flex flex-col lg:flex-row justify-evenly items-center container mx-auto'>
        <div className='bg-primary p-[15px] text-white lg:w-[70%] min-h-[400px] flex flex-col justify-center gap-2'>
        <h1 className='text-4xl font-[700]'>How We Work</h1>
        <p className='font-[500] md:mr-[300px]'>At our organization, we prioritize collaboration, efficiency, and innovation, fostering a culture of teamwork, clear communication, and commitment to excellence. We focus on continuous improvement, optimizing processes, leveraging cutting-edge technologies, and adapting to evolving trends to meet client needs. Through strategic planning, agile methodologies, and a customer-centric approach, we ensure precision in project execution and deliver maximum value.</p>
        </div>
        <div className='hidden md:flex flex-wrap gap-2 w-full justify-evenly lg:w-fit lg:ml-[-20%]'>
            <div className='bg-secondary text-white text-xl p-[10px] w-[32%] lg:w-[25%] text-center font-[600] flex flex-col items-center justify-center h-[200px]'>
                <h1>Team Collaboration</h1>
            </div>
            <div className='bg-secondary text-white text-xl p-[10px] w-[32%] lg:w-[25%] text-center font-[600] flex flex-col items-center justify-center h-[200px]'>
                <h1>Efficiency and Optimization</h1>
            </div>
            <div className='bg-secondary text-white text-xl p-[10px] w-[32%] lg:w-[25%] text-center font-[600] flex flex-col items-center justify-center h-[200px]'>
                <h1>Innovation and Adaptability</h1>
            </div>
        </div>
    </div>
  )
}

export default WhyChooseUs
