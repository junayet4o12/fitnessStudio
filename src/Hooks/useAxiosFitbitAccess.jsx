import axios from "axios";

// import React from 'react';
const axiosFitbitAccess = axios.create({
    baseURL: 'https://fitnessstudio-backend-h3geanesv-jubayer-ahmed-sajid.vercel.app', 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosFitbitAccess = () => {
    return axiosFitbitAccess
};

export default useAxiosFitbitAccess;