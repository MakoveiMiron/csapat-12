import { API_URL } from "../../constans/firebaseConstans";
import { useState, useEffect } from 'react';
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
            <table className="customersTable">
                    <tr className="customersHeader">
                        <th><h1>Name</h1></th>
                        <th><h1>UID</h1></th>
                        <th><h1>Email</h1></th>
                    </tr>
                
            {customer.map(x =>(
                    <tr className="customersData">
                        <td><h3>{x.name}</h3></td>
                        <td><p>{x.uid}</p></td>
                        <td><p>{!x.email ? "Nincs megadott email" : x.email}</p></td>
                    </tr>
            )
            )}
            </table>
        </>
    )
}