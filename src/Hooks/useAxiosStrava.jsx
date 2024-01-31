import axios from "axios";

// import React from 'react';
const axiosStrava = axios.create({
    baseURL: 'http://localhost:5000', 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosStrava = () => {
    return axiosStrava
};

export default useAxiosStrava;