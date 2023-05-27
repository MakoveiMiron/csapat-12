import { useContext, useState, useEffect } from "react"
import { getOrderIds, readProducts, } from "../../services/Crud";
import { LoggedInUserContext} from "../../contexts/LoggedInUserContext";
import "./Orders.css";
import { deleteOrder } from "../../services/authCrud"
import { toast } from "react-toastify";

export default function AdminOrders(){
    const [orders, setOrders] = useState([]);
    const [productList, setProductList] = useState([]);
    const [user,setUser] = useContext(LoggedInUserContext);

    
    useEffect(() => {
        getOrderIds()
        .then(resp =>{
            setOrders(resp)
        });
    },[orders]);

    useEffect(() => {
        readProducts()
        .then(resp => {
            setProductList(resp);
        })
    },[]);

    if(!user)return<h1>Ehhez bekell jelentkezned előbb!</h1>
    if(!orders)return<h1>Nincsenek rendeléseid!</h1>
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
        function productName(id){
            let title;
            Object.values(productList).forEach(product => {if(id === product.id){ title = product.title}});
            return title
        }
        function productPrice(id){
            let price;
            Object.values(productList).forEach(product => {if(id === product.id){ price = product.price}});
            return price
        }

        function removeOrder(orderId){
            try{
                deleteOrder(orderId);
                toast.success("Sikeresen törölted a megrendelést!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            catch (error){
                toast.error("Hiba a megrendelés törlésekor!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }

        return(
            <>
                    <h1>Rendeléseim</h1>
                    <div className="orders-container">
                        <>   
                                {Object.values(orders).map((order,idx) => {if(user.uid === order.uid){
                                    return(
                                        <>
                                        <div className="order-card">
                                            <h2 key={order.id}>Rendelés ID: {order.id}</h2>
                                            <ul>
                                                {listProducts(order.id).map(id => <li key={id}>{`${id[1]}db `} {productName(id[0])}  {productPrice(id[0]) * id[1]}Ft</li>)}
                                            </ul>
                                            <button onClick={() => removeOrder(order.id)}>Rendelés visszavonása</button>
                                        </div>
                                        </>
                                    )
                                }
                                else{
                                    if(Object.values(orders).length-1 === idx){
                                        return<h1 className="no-orders">Nincsenek  rendeléseid!</h1>
                                    }
                                }})}
                        </>
                    </div>
            </>
        )
    
}
