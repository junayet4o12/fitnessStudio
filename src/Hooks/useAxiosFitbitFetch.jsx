import axios from "axios";

const axiosFitbitFetch = axios.create({
    baseURL: 'https://api.fitbit.com',
    headers:{
        "Authorization": `Bearer ${localStorage.getItem('Authorization')}`,
        "Content-Type": 'application/json',
       
    }
})

const useAxiosFitbitFetch =()=>{
    return axiosFitbitFetch
}
export default useAxiosFitbitFetch ; 