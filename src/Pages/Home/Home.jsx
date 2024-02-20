// import React from 'react';

import Banner from "../../Components/Banner/Banner";
import OurFeatures from "../../Components/StarFeatures/OurFeatures";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import Testimonials from "../../Components/Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-[#000428] to-[#004e92] text-white">
      <Banner></Banner>
      <OurFeatures></OurFeatures>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
