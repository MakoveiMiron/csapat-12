import { API_URL } from "../../constans/firebaseConstans";
import { useState, useEffect } from 'react'
import "./adminCustomers.css"

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
        <div className="customer-container">
            {customer.map(x =>(
                <>
                <div className="customer">
                    <h1 className="name"><span>Név:</span> {x.name}</h1>
                    <p className="id"><span>Id:</span> {x.uid}</p>
                    <hr></hr>
                </div>
                </>
            )
            )}
        </div>
        </>
    )
}