import axios from "axios";
import { backendUrl } from "../BackendUrl/backendUrl";

// import React from 'react';
const axiosFitbitAccess = axios.create({
<<<<<<< HEAD
    baseURL: 'http://localhost:5000', 
=======
    baseURL: backendUrl, 
>>>>>>> d11831cf5cfc69e7a3fc886b21f1203220891ca2
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosFitbitAccess = () => {
    return axiosFitbitAccess
};

export default useAxiosFitbitAccess;