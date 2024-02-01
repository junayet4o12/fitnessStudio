import axios from "axios";

const axiosFitbitAuthorize = axios.create({
    baseURL: 'http://localhost:3000', 
    headers: {
      'Content-Type': 'application/json',
    },
  });
const useAxiosFitbitAuthorize = () => {
    return axiosFitbitAuthorize
}

export default useAxiosFitbitAuthorize
