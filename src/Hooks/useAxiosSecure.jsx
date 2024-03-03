import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import { backendUrl } from '../BackendUrl/backendUrl';

const axiosSecure = axios.create({
  baseURL: backendUrl,
  withCredentials: true, // Send cookies with requests
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
        const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim());
        // console.log(tokenCookie)
        // console.log('request stopped by the interceptor')
      return config;
    }, 
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    
    function (response) {
      return response;
    },
    async (error) => {
      const status = error?.response?.status;
      console.log(status);
      if (status === 401 || status === 403) {
        logOut();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
