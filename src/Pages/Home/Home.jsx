// import React from 'react';

import Banner from "../../Components/Banner/Banner";
import OurFeatures from "../../Components/StarFeatures/OurFeatures";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import Testimonials from "../../Components/Testimonials/Testimonials";
import WhyChooseUs from "../../Components/WhyChooseUs/WhyChooseUs";
import OurTeam from "../../Components/OurTeam/OurTeam";

const Home = () => {
  return (
    <div className="bg-white text-black">
      <Banner></Banner>
      <OurFeatures></OurFeatures>
      <WhyChooseUs/>
      <OurTeam/>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
