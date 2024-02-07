import axios from "axios";
import { backendUrl } from "../BackendUrl/backendUrl";

// import React from 'react';
const axiosPublic = axios.create({
<<<<<<< HEAD
    baseURL: 'http://localhost:5000',
=======
    baseURL: backendUrl,
>>>>>>> d11831cf5cfc69e7a3fc886b21f1203220891ca2
    withCredentials: true,
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;