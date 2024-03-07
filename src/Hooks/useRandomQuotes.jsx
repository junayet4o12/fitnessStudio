import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useRandomQuotes = () => {
    const [quotes, setQuote] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

   
    useEffect(() => {
        const randomQuote = async () => {
            const fetchQuoteData = await axiosPublic('/quotes')
            const fetchQuote = fetchQuoteData.data
            const randomIndex = Math.floor(Math.random() * fetchQuote.length);
            setQuote(fetchQuote[randomIndex])
            setIsLoading(false)
    
        }
        randomQuote();
        const interval = setInterval(randomQuote, 15000);
        return () => clearInterval(interval);
    }, [axiosPublic])
    return [quotes, isLoading];

};

export default useRandomQuotes;


