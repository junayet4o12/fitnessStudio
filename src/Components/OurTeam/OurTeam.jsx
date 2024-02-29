import React from 'react'
import devImg from "../../assets/images/Developer.png"

const OurTeam = () => {
  return (
    <div className="ourTeam my-[50px]">
          <div className="member flex flex-col justify-center gap-2 items-center">
            <h1 className="text-center text-3xl font-bold  ">Our Team</h1>
            <div className='bg-primary h-[4px] w-[98%] lg:w-[20%] rounded-lg'></div>
            <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-center">
              <div className="my-[20px] h-[300px] md:h-[400px] hover:ease-out duration-[0.5s] flex flex-col items-start justify-start text-secondary shadow-xl w-[100%] lg:w-[30%] rounded-md cursor-pointer p-[20px] card0">
                {/* <img className="h-[100px] object-cover" src={devImg} alt="devImg"/> */}
                <div className='h-full bg-transparent hover:border-2 hover:border-secondary rounded-md p-[10px] w-full'>
                  <h1 className="font-[500] text-xl name">Jobayer Ahmed Sajid</h1>
                  <h1 className="font-[500] text-secondary degi">Team Leader</h1>
                  <p className='degi mt-[10px]'><a href="https://www.linkedin.com/in/jobayer-ahmed-sajid?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank'><span className='bg-secondary p-[10px] rounded-md bg-opacity-50 '>Portfolio</span></a></p>
                </div>
              </div>
              <div className="my-[20px] h-[300px] md:h-[400px] hover:ease-out duration-[0.5s] flex flex-col items-start justify-start text-secondary shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px] card1">
              <div className='h-full bg-transparent hover:border-2 hover:border-secondary rounded-md p-[10px] w-full'>
                <h1 className="font-[500] text-xl name">Jobayer Rahman Ohee</h1>
                <h1 className="font-[500] text-secondary degi">Developer</h1>
                <p className='degi mt-[10px]'><a href="https://jobayerportfolio.netlify.app" target='_blank'><span className='bg-secondary p-[10px] rounded-md bg-opacity-50 '>Portfolio</span></a></p>
                </div>
              </div>
              <div className="my-[20px] h-[300px] md:h-[400px] hover:ease-out duration-[0.5s] flex flex-col items-start justify-start text-secondary shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px] card2">
              <div className='h-full bg-transparent hover:border-2 hover:border-secondary rounded-md p-[10px] w-full'>
                <h1 className="font-[500] text-xl name">Junayet Alam</h1>
                <h1 className="font-[500] text-secondary degi">Developer</h1>
                <p className='degi mt-[10px]'><a href="https://junayet-alam-portfolio.vercel.app" target='_blank'><span className='bg-secondary p-[10px] rounded-md bg-opacity-50 '>Portfolio</span></a></p>
                </div>
              </div>
              <div className="my-[20px] h-[300px] md:h-[400px] hover:ease-out duration-[0.5s] flex flex-col items-start justify-start text-secondary shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px] card3">
              <div className='h-full bg-transparent hover:border-2 hover:border-secondary rounded-md p-[10px] w-full'>
                <h1 className="font-[500] text-xl name">Barkat Ullah Rakib</h1>
                <h1 className="font-[500] text-secondary degi">Developer</h1>
                <p className='degi mt-[10px]'><a href="https://www.linkedin.com/in/barkat-ullah-1013b82a3" target='_blank'><span className='bg-secondary p-[10px] rounded-md bg-opacity-50 '>Portfolio</span></a></p>
                </div>
              </div>
              <div className="my-[20px] h-[300px] md:h-[400px] hover:ease-out duration-[0.5s] flex flex-col items-start justify-start text-secondary shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px] card4">
              <div className='h-full bg-transparent hover:border-2 hover:border-secondary rounded-md p-[10px] w-full'>
                <h1 className="font-[500] text-xl name">Fakhruddin ahmed</h1>
                <h1 className="font-[500] text-secondary degi">Developer</h1>
                <p className='degi mt-[10px]'><a href="https://fakruddin_portfolio.surge.sh" target='_blank'><span className='bg-secondary p-[10px] rounded-md bg-opacity-50 '>Portfolio</span></a></p>
                </div>
              </div>
              <div className="my-[20px] h-[300px] md:h-[400px] hover:ease-out duration-[0.5s] flex flex-col items-start justify-start text-secondary shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px] card5">
              <div className='h-full bg-transparent hover:border-2 hover:border-secondary rounded-md p-[10px] w-full'>
                <h1 className="font-[500] text-xl name">Md Shahriar Salam Arman</h1>
                <h1 className="font-[500] text-secondary degi">Developer</h1>
                <p className='degi mt-[10px]'><a href="https://portfolio-ten-dun-17.vercel.app" target='_blank'><span className='bg-secondary p-[10px] rounded-md bg-opacity-50 '>Portfolio</span></a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default OurTeam
