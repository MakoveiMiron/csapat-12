import { LoggedInUserContext } from "../../contexts/LoggedInUserContext"
import { useContext, useState, useEffect } from "react"
import { getOrderIds, readProducts } from "../../services/Crud";

export default function Orders(){
    const [orderIds, setOrderIds] = useState([])
    const [user, setUser] = useContext(LoggedInUserContext);
    const [orders,setOrders] = useState({});
    const [productList,setProductList] = useState([]);
    const [orderId,setOrderId] = useState("");
    const foundProducts = [];
    const orderedAmount = [];

    useEffect(() => {
        getOrderIds()
        .then(resp =>{
            setOrderIds(Object.keys(resp));
            setOrders(resp)
        });
        readProducts()
        .then(resp => setProductList(Object.values(resp)))
    },[])
      
    if (!user) return <h2>Ehhez jelentkezz be előbb!</h2>;


    orderIds.forEach((id) => {
        if (orders[id].uid === user.uid) {
            const productIds = Object.keys(orders[id].products);
            orderedAmount.push(Object.values(orders[id].products));
            productIds.forEach((productId) => {
            const orderedProducts = productList.filter((product) => product.id === productId);
            foundProducts.push(...orderedProducts);
            console.log(orders)
        });
        }
    });

    if (foundProducts.length === 0) {
        return <h2>Nincs rendelésed!</h2>;
    }
   
    return (
        <>
        
        {foundProducts.map((product, index) => (
                <div>
                    <p className="orderId">{orders[orderIds[index]].uid === user.uid ? orderIds[index] : null}</p>
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                        <p>{orderedAmount[0][index]}</p>
                </div>
        ))}
        
        </>
    );
}