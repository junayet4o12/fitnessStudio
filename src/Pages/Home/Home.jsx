// import React from 'react';

import Banner from "../../Components/Banner/Banner";
import OurFeatures from "../../Components/StarFeatures/OurFeatures";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import Testimonials from "../../Components/Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="bg-white text-black">
      <Banner></Banner>
      <OurFeatures></OurFeatures>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
