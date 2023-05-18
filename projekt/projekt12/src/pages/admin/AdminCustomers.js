import { API_URL } from "../../constans/firebaseConstans";
import { useState, useEffect } from 'react'

export default function AdminCustomers(){
    const [customer, setCustomer] = useState([])
    function readCustomers(){
        return fetch(`${API_URL}vasarlok.json`)
        .then(resp => resp.json())
    }
    useEffect(() =>{
        readCustomers().then((resp) =>{
            setCustomer(Object.values(resp))
            
            
        })
    },[])
   

    return(
        <>
            {customer.map(x =>(
                <>
                    <h1>{x.name}</h1>
                    <p>{x.uid}</p>
                </>
            )
            )}
        </>
    )
}