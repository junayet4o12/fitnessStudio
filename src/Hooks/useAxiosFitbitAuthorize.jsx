import axios from "axios";
import { backendUrl } from "../BackendUrl/backendUrl";

const axiosFitbitAuthorize = axios.create({
    baseURL: backendUrl, 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosFitbitAuthorize = () => {
    return axiosFitbitAuthorize
}

export default useAxiosFitbitAuthorize
