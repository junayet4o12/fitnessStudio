import React from 'react'

const BMIBanner = () => {
  return (
    <div className='flex flex-col gap-0 md:flex-row justify-around items-center  '>
        <div className='md:w-[65%] h-[80vh] md:mb-[0px] flex flex-col justify-center p-[25px] bg-secondary bg-opacity-[0.4] rounded-md '>
            <h1 className='font-bold text-3xl text-center md:text-left md:text-5xl'>Body Mass <br/> Index Calculator</h1>
            <p className="pt-[25px] md:w-[60%] text-center md:text-left">Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.</p>
        </div>
        <div className='mx-auto w-[95%] h-fit md:ml-[-20%] shadow-2xl shadow-secondary p-[25px] rounded-md md:w-[45%] bg-white'>
            <h1 className='pb-[25px] font-bold text-xl md:text-2xl'>Enter your details below</h1>
            <form>
               <div className='flex flex-col md:flex-row gap-2 justify-between'>
                    <div className='lg:w-[45%]'>
                            <label htmlFor='Height'>Height</label>
                            <br/>
                            <div className='border-2 w-[100%] border-primary rounded-md flex flex-row-reverse p-[5px] items-center justify-around'>
                            <h1 className='text-secondary text-2xl font-bold'>cm</h1>
                            <input className='p-[5px] w-full outline-none bmiNumber border-none text-primary text-2xl font-[500]' maxLength="3" type="text" placeholder="0" id="Height" />
                            </div>
                    </div>
                    <div className='lg:w-[45%]'>
                            <label htmlFor='Weight'>Weight</label>
                            <br/>
                            <div className='border-2 w-[100%] border-primary rounded-md flex flex-row-reverse p-[5px] items-center justify-around'>
                            <h1 className='text-secondary text-2xl font-bold'>Kg</h1>
                            <input className='p-[5px] w-full outline-none bmiNumber border-none text-primary text-2xl font-[500]' maxLength="3" type="text" placeholder="0" id="Weight" />
                            </div>
                    </div>
               </div>
            </form>
            <div className='bg-primary rounded-xl md:rounded-tr-[100px] md:rounded-br-[100px] mt-[20px] p-[40px] text-white '>
                <h1 className='text-2xl font-bold'>Welcome!</h1>
                <p className=''>Enter your height and weight and you’ll see your BMI result here</p>
            </div>
        </div>
    </div>
  )
}

export default BMIBanner
