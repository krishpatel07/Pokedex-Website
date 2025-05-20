import { useState, useEffect } from 'react';

export const useFetch = (pokeApi) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    
    // it will be executed when you change the url in the file where our is called
    //custom hook
    useEffect(() => {
        const getPokemons = async (pokeApi) => {
            
            try {
                let res = await fetch(pokeApi);

                if(!res.ok){
                
                    throw {
                        err: true, 
                        status: res.status, 
                        statusText: !res.statusText ? "An error Occurred" : res.statusText,
                    };
                }

                let dataJson = await res.json();

                setIsPending(false);

                setData(dataJson);

                setError({err: false});
            } catch (err) {
                setIsPending(true);
                setError({err});
            }
        };
        
        getPokemons(pokeApi);
    }, [pokeApi]);

    // what our function will return will be our hook
    return {data, isPending, error}
}