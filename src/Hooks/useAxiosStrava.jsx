import axios from "axios";

// import React from 'react';
const axiosStrava = axios.create({
    baseURL: 'https://fitnessstudio-bacend.vercel.app', 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosStrava = () => {
    return axiosStrava
};

export default useAxiosStrava;