import axios from "axios";
import { backendUrl } from "../BackendUrl/backendUrl";

// import React from 'react';
const axiosFitbitAccess = axios.create({
    baseURL: backendUrl, 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosFitbitAccess = () => {
    return axiosFitbitAccess
};

export default useAxiosFitbitAccess;