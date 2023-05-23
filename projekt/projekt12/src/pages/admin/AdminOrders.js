import { useContext, useState, useEffect } from "react"
import { getOrderIds, readProducts, } from "../../services/Crud";
import { readUsers } from "../../services/authCrud";
import { useNavigate } from "react-router-dom";

export default function AdminOrders(){
    const [orders, setOrders] = useState([]);
    const [productList, setProductList] = useState([]);
    const [users,setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        getOrderIds()
        .then(resp =>{
            setOrders(resp)
        });
    },[]);

    useEffect(() => {
        readProducts()
        .then(resp => {
            setProductList(resp);
        })
    },[]);

    useEffect(() => {
        readUsers("vasarlok")
        .then(resp => setUsers(Object.values(resp)))
    },[])
       
    function listProducts(orderId){
        const order = Object.values(orders)
        let result;
        
        order.forEach(ord => {
            if(ord.id === orderId){
                result = Object.entries(ord.products)
            }
        })
        return result
        }

        return(
            <>
                <div>
                    <h1>Admin rendelesek</h1>
                    <div>
                    {Object.keys(orders).map((orderId,index) => (
                       <>   
                            <h2>Rendelés ID: {orderId}</h2>
                         <div>
                            Rendelő adatai:
                                <ul>
                                    <li>Vevő neve: {Object.values(orders).map((order,idx) => users.map((user) => {if(index === idx && order.uid === user.uid){
                                        return user.name
                                        }}))}</li>
                                    <li>Vevő uid: {Object.values(orders).map((order,idx) => users.map((user) => {if(index === idx && order.uid === user.uid){
                                        return user.uid
                                        }}))}
                                    </li>
                                </ul>

                                Rendelés tartalma:
                                <ul>
                                    {listProducts(orderId).map(id => <li key={id}>{`${id[1]}db `}{id}{" (termek id)"}</li>)}
                                </ul>
                
                               <button onClick={() => navigate(`/admin/megrendelesek/${orderId}`)}>Adatlap</button>
                            </div>
                        </>
                    ))}
                    </div>
                </div>
            </>
        )
    
}
