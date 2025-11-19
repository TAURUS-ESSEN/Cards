import { useState, useEffect} from 'react';

export default function Timer() {
    const [timer, setTimer] = useState(0);
    
    useEffect(()=>{
        const id = setInterval(() =>{
            setTimer(prev=>prev+1)
    }, 1000)
    return ()=> clearInterval(id);
    },[])  

    return (
        <>
            {timer}
        </>
    )
}