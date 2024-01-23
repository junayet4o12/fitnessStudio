import axios from "axios";

// import React from 'react';
const axiosPublic = axios.create({
    baseURL: 'https://fitnessstudio-bacend-4bsh8mq7k-jubayer-ahmed-sajid.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;