import React from 'react'
import aboutIntro from "../../assets/images/aboutIntro.png"
import missionpic from "../../assets/images/missionpic.png"
import visionImg from "../../assets/images/visionImg.png"
import devImg from "../../assets/images/Developer.png"

const Aboutus = () => {
  return (
    <div className="mt-[50px] p-[10px]" >
      <div className="intro lg:flex justify-evenly items-center">
        <div className="lg:w-[50%]">
        <h1 className=" text-2xl lg:text-5xl font-bold my-[15px] ">About <span className="text-[#ff4704]" >FitnessStudio</span></h1>
        <p className="font-[500]">Welcome to our inclusive <span className="text-[#ff4704] font-bold">Fitnessstudio</span>, where certified trainers offer personalized <span className="text-[#ff4704] font-bold">workouts </span>, including HIIT, yoga, and strength conditioning. Whether you're a fitness enthusiast or beginner, we're here to support your journey to improved health and wellness in a motivating atmosphere. Join us to redefine your fitness experience and achieve your <span className="text-[#ff4704] font-bold">goals.</span></p>
        </div>
        <div className="lg:w-[50%]">
        <img className="w-full" src={aboutIntro} alt="About page" />
        </div>
      </div>
      <div>
        <div className="mission and vision section my-[50px]">
          <div className="flex flex-col items-center">
           <h1 className="font-bold text-3xl">Our Mission
           <spna className="specialFont text-[#ff4704]"> & </spna>
           Vision</h1>
           <div className='bg-[#ff4704] h-[4px] w-[90%] lg:w-[25%] rounded-lg'></div>
          </div>
          <div className="missionSection flex flex-col lg:flex-row gap-2 my-[25px] items-center ">
            <div  className="lg:w-[50%]">
            <img  className="w-full " src={missionpic} alt="mission pic"/>
            </div>
            <div className="lg:w-[50%] flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Our Mission</h1>
              <div className='bg-[#ff4704] h-[4px] w-[30%] lg:w-[25%] rounded-lg'></div>
              <p className="font-[500]">                
                Our mission is to inspire and empower individuals to lead healthier, more fulfilling lives through fitness and well-being. We are committed to creating a supportive and inclusive community where everyone, regardless of their fitness level, feels welcomed and motivated. Our goal is to provide personalized and innovative fitness solutions that cater to the diverse needs of our members. By fostering a positive and encouraging environment, we aim to guide individuals on their journey to optimal health, helping them achieve their fitness goals and embrace a sustainable and active lifestyle. Through a combination of cutting-edge programs, expert guidance, and a sense of community, we aspire to make a lasting impact on the well-being of our members, promoting a happier and healthier way of life.
              </p>
            </div>
          </div>
          <div className="visionSection flex flex-col lg:flex-row-reverse gap-2 my-[25px] items-center ">
            <div  className="lg:w-[50%]">
            <img  className="w-full " src={visionImg} alt="mission pic"/>
            </div>
            <div className="lg:w-[50%] flex flex-col gap-2 lg:text-right lg:items-end">
              <h1 className="text-2xl font-bold">Our Vision</h1>
              <div className='bg-[#ff4704] h-[4px] w-[30%] lg:w-[25%] rounded-lg'></div>
              <p className="font-[500]">                
              Our vision is to be a beacon of health and vitality, transforming lives by promoting a holistic approach to fitness and well-being. We envision a community where individuals not only achieve their fitness goals but also cultivate a profound sense of overall wellness. Through continuous innovation, personalized guidance, and a strong sense of community, we aim to set new standards in the fitness industry. Our vision is to inspire and lead a movement toward a healthier, more active, and fulfilling lifestyle, leaving a lasting impact on individuals and the broader community.
              </p>
            </div>
          </div>
        </div>
        <div className="storyBehind bg-[#ff4704] p-[25px] bg-opacity-[0.6] min-h-[350px] justify-center rounded-tl-[50px] rounded-br-[50px] flex flex-col items-center gap-2 text-white text-center">
          <h1 className="text-xl pb-[15px] lg:text-4xl font-bold"> Story Behind the Platform</h1>
          <div className='bg-[white] h-[4px] w-[90%] lg:w-[25%] rounded-lg'></div>
          <p className="font-[500] pt-[15px]">
          Our platform's journey began with a shared passion for promoting well-being and a belief in the transformative power of fitness. A group of health enthusiasts, including certified trainers and technology experts, came together with a vision to create a space that goes beyond traditional fitness platforms. Driven by a desire to make personalized and effective fitness accessible to all, they combined their expertise to develop a platform that embraces innovation and community support. The platform evolved from a simple idea into a dynamic space where individuals, regardless of their fitness levels, could find tailored guidance, motivating workouts, and a supportive community. The story of our platform is one of collaboration, dedication, and a commitment to empower individuals on their unique journeys toward healthier and happier lives.
          </p>
        </div>
      </div>
        <div className="ourTeam my-[50px]">
          <div className="member flex flex-col justify-center gap-2 items-center">
            <h1 className="text-center text-3xl font-bold  ">Our Team</h1>
            <div className='bg-[#ff4704] h-[4px] w-[90%] lg:w-[20%] rounded-lg'></div>
            <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-evenly items-center">
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Jobayer Ahmed Sajid</h1>
                <h1 className="font-[500] text-[#ff4704]">Team Leader</h1>
              </div>
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Jobayer Rahman Ohee</h1>
                <h1 className="font-[500] text-[#ff4704]">Developer</h1>
              </div>
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Junayet Alam</h1>
                <h1 className="font-[500] text-[#ff4704]">Developer</h1>
              </div>
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Barkat Ullah Rakib</h1>
                <h1 className="font-[500] text-[#ff4704]">Developer</h1>
              </div>
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Fakhruddin ahmed</h1>
                <h1 className="font-[500] text-[#ff4704]">Developer</h1>
              </div>
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Md Shahriar Salam Arman</h1>
                <h1 className="font-[500] text-[#ff4704]">Developer</h1>
              </div>
            </div>
          </div>
        </div>
      <div className="faq flex flex-col gap-2 justify-center items-center lg:mx-[25px]">
        <h1 className="specialFont text-5xl font-bold">F.A.Q</h1>
        <div className='bg-[#ff4704] h-[5px] w-[50%] lg:w-[15%] rounded-lg'></div>
        <div className="my-[25px] flex lg:gap-2 flex-col md:flex-row">
        <div className="faq-1">
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    How do I get started on the platform?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>To begin your fitness journey with us, simply sign up for an account on our platform. Once registered, you can explore our diverse range of workouts, programs, and resources tailored to your fitness goals.</p>
    </div>
          </div>
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    Are the workouts suitable for all fitness levels?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>
        Absolutely! Our platform caters to individuals of all fitness levels, from beginners to advanced. Our programs are designed to be adaptable, allowing you to progress at your own pace and choose workouts that match your current fitness capabilities.
      </p>
    </div>
          </div>
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    What kind of support can I expect from the platform?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>
      We are committed to providing comprehensive support. Our platform offers expert guidance through certified trainers, community forums for interaction and motivation, and regular updates to keep you informed and engaged on your fitness journey.
      </p>
    </div>
          </div>
        </div>
        <div className="faq-2">
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    Can I access the platform on different devices?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>Yes, our platform is designed to be accessible on various devices, including smartphones, tablets, and computers. This flexibility ensures that you can engage with your workouts and community from anywhere at any time.</p>
    </div>
          </div>
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    Is there a personalized workout plan available?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>
      Absolutely! We understand that everyone's fitness journey is unique. Our platform offers personalized workout plans based on your fitness goals, preferences, and progress. This tailored approach ensures that you get the most out of your fitness experience.
      </p>
    </div>
          </div>
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    What sets your platform apart from other fitness apps?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>
      Our platform distinguishes itself through a combination of innovative workout programs, certified trainers, and a supportive community. We focus not only on physical fitness but also on overall well-being, aiming to create a holistic and empowering experience for our users.
      </p>
    </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Aboutus
