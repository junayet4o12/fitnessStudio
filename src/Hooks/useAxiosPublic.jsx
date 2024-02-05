import axios from "axios";

// import React from 'react';
const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: 'https://fitnessstudio-backend-m0iftt2di-jubayer-ahmed-sajid.vercel.app',
    withCredentials: true,
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;