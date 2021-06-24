import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCtrl = new AbortController();

        fetch(url, { signal: abortCtrl.signal })
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                
                    setIsPending(false);
                    setError(err.message);
                   
            })
        
             return () => abortCtrl.abort();

    }, [url]);

    return { data, isPending, error }
}

export default useFetch;