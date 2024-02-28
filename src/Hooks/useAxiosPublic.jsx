import axios from "axios";
import { backendUrl } from "../BackendUrl/backendUrl";
 
// import React from 'react';
const axiosPublic = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;