// import React from 'react';

import Banner from "../../Components/Banner/Banner";
import OurFeatures from "../../Components/StarFeatures/OurFeatures";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import Testimonials from "../../Components/Testimonials/Testimonials";
import WhyChooseUs from "../../Components/WhyChooseUs/WhyChooseUs";
import OurTeam from "../../Components/OurTeam/OurTeam";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../Hooks/useAuth";
import { fetchSingleUser } from "../../Redux/SingleUserSlice/singleUserSlice";
import { socket } from "../../socketIo/socket";

const Home = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()

  const { user: userDetails } = useSelector(state => state.user)

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchSingleUser(user?.email))
    }
  }, [dispatch, user])
  useEffect(() => {
    if (userDetails) {

      socket.emit('user_connected', { userId: userDetails?._id })
    }

  }, [userDetails])
  return (
    <div className="bg-white text-black">
      <Banner></Banner>
      <OurFeatures></OurFeatures>
      <WhyChooseUs />
      <OurTeam />
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
