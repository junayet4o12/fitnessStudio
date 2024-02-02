import axios from "axios";

// import React from 'react';
const axiosPublic = axios.create({
    baseURL: 'https://fitnessstudio-backend-h3geanesv-jubayer-ahmed-sajid.vercel.app',
    withCredentials: true,
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;