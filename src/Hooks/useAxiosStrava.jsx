import axios from "axios";
import { backendUrl } from "../BackendUrl/backendUrl";

// import React from 'react';
const axiosStrava = axios.create({
    baseURL: backendUrl, 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosStrava = () => {
    return axiosStrava
};
 
export default useAxiosStrava;