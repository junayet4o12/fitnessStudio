// import React from 'react';

import Banner from "../../Components/Banner/Banner";
import OurFeatures from "../../Components/StarFeatures/OurFeatures";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import Testimonials from "../../Components/Testimonials/Testimonials";
// import TrackProgress from "../TrackProgress/TrackProgress";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurFeatures></OurFeatures>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            {/* <TrackProgress/> */}
        </div>
    );
};

export default Home;