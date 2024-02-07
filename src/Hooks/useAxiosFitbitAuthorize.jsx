import axios from "axios";
import { backendUrl } from "../BackendUrl/backendUrl";

const axiosFitbitAuthorize = axios.create({
<<<<<<< HEAD
    baseURL: 'http://localhost:5000', 
=======
    baseURL: backendUrl, 
>>>>>>> d11831cf5cfc69e7a3fc886b21f1203220891ca2
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosFitbitAuthorize = () => {
    return axiosFitbitAuthorize
}

export default useAxiosFitbitAuthorize
