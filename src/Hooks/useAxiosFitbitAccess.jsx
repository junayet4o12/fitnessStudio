import axios from "axios";

// import React from 'react';
const axiosFitbitAccess = axios.create({
    baseURL: 'http://localhost:5000', 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosFitbitAccess = () => {
    return axiosFitbitAccess
};

export default useAxiosFitbitAccess;