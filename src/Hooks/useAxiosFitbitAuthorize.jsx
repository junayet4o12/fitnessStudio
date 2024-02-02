import axios from "axios";

const axiosFitbitAuthorize = axios.create({
    baseURL: 'https://fitnessstudio-bacend.vercel.app', 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosFitbitAuthorize = () => {
    return axiosFitbitAuthorize
}

export default useAxiosFitbitAuthorize
