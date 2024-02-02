import axios from "axios";

const axiosFitbitAuthorize = axios.create({
    baseURL: 'https://fitnessstudio-backend-m0iftt2di-jubayer-ahmed-sajid.vercel.app', 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosFitbitAuthorize = () => {
    return axiosFitbitAuthorize
}

export default useAxiosFitbitAuthorize
