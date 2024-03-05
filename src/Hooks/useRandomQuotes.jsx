import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';
import axios from 'axios';

const useRandomQuotes = () => {
    const [quote, setQuote] = useState('')
    const [isLoading, setIsLoading] = useState(true)

   
    useEffect(() => {
        const randomQuote = async () => {
            const fetchQuoteData = await axios.get('https://type.fit/api/quotes')
            console.log(fetchQuoteData)
            const fetchQuote = fetchQuoteData.data
            const randomIndex = Math.floor(Math.random() * fetchQuote.length);
            setQuote(fetchQuote[randomIndex].text)
            setIsLoading(false)
    
        }
        randomQuote();
        const interval = setInterval(randomQuote, 60000);
        return () => clearInterval(interval);
    }, [])
    return { quote, isLoading };

};

export default useRandomQuotes;