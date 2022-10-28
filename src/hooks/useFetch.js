import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [ data, setData ] = useState(null);

    const [ loading, setLoading] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const res = await fetch(url);
                const data = await res.json();
                setData(data);
            } catch (error) {
                setError("Erro ao carregar os dados!")
            }
            setLoading(false); 
        }
        fetchData();
    }, [url]);

    return { data, error, loading };
}