import axios from 'axios';

const axiosStravaFetch = axios.create({
    baseURL: 'https://www.strava.com/api/v3',
    });

const useAxiosStravaFetch = () => {
    return axiosStravaFetch;
};

export default useAxiosStravaFetch;