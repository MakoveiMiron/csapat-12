import { useContext, useState, useEffect } from "react"
import { getOrderIds, readProducts, } from "../../services/Crud";
import { readUsers } from "../../services/authCrud";
import { NavLink } from "react-router-dom";

export default function AdminOrders(){
    const [orders,setOrders] = useState({});
    const [productList,setProductList] = useState([]);

    useEffect(() => {
        getOrderIds()
        .then(resp =>{
            setOrders(resp)
        });
        readProducts()
        .then(resp => setProductList(Object.values(resp)))
    },[]);
    function findProduct(product){
       const found = productList.find(id => id.id === product)
       return found
    }

    async function findUser(uid){
        let name;
        readUsers("vasarlok",uid)
        .then(resp => name = resp.name);
        return name
    }
   
    return(
        <>
            <div>
                <h1>Admin rendelesek</h1>
            </div>
            
                {Object.entries(orders).map((order,index)=> (
                    <>
                        <h2 key={order[0]}>{order[0]}</h2>
                        <ul>
                            <li>Vevő neve: {findUser(order[1].uid)}</li>
                            <li key={order[1].id}>Rendelés id: {order[1].id}</li>
                            <li key={order[1].uid}>Rendelő uid: {order[1].uid}</li>
                            <p>Rendelt termékek:</p>
                            
                                {Object.entries(order[1].products).map( (product) => (
                                        <ul>
                                            <li>{findProduct(product[0]).title} {findProduct(product[0]).price}Ft</li>
                                        </ul>
                                ))}
                            
                        </ul>
                    </>
                ))}
            
        </>
    )
}