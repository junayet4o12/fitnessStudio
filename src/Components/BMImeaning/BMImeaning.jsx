import React from 'react'
import BMIman from "../../assets/images/BMIman.webp"
import eatingIcon from "../../assets/images/icon-eating.svg"
import exericiseIcon from "../../assets/images/icon-exercise.svg"
import sleepIcon from "../../assets/images/icon-sleep.svg"

const BMImeaning = () => {
  return (
    <div>
        <div className='flex flex-col lg:flex-row items-center gap-2 justify-evenly md:w-[80%] mx-auto my-[50px]'>
        <div className='lg:w-[50%]'>
             <img  src={BMIman}/>
        </div>
        <div className='lg:w-[45%] mt-[10%]'>
            <h1 className='text-xl md:text-5xl font-bold pb-[25px]'>What your BMI result means</h1>
            <p>
            A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.
            </p>
        </div>

    </div>
        <div className='bg-secondary lg:w-[90%] bg-opacity-[0.2] my-[100px] rounded-tr-[20px] rounded-br-[20px]  p-[25px] flex flex-col md:flex-row gap-5'>
            <div className='flex flex-col gap-5'>
                <img className='w-[70px]' src={eatingIcon}/>
                <h1 className='font-bold text-xl'>Healthy eating</h1>
                <p>Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood</p>
            </div>
            <div className='flex flex-col gap-5'>
                <img className='w-[70px]' src={exericiseIcon}/>
                <h1 className='font-bold text-xl'>Regular exercise</h1>
                <p>Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.</p>
            </div>
            <div className='flex flex-col gap-5'>
                <img className='w-[70px]' src={sleepIcon}/>
                <h1 className='font-bold text-xl'>Adequate sleep</h1>
                <p>Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.</p>
            </div>
        </div>
    </div>
  )
}

export default BMImeaning
