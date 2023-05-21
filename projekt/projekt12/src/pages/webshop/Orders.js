import { LoggedInUserContext } from "../../contexts/LoggedInUserContext"
import { useContext, useState, useEffect } from "react"
import { getOrderIds, readProducts } from "../../services/Crud";

export default function Orders(){
    const [orderIds, setOrderIds] = useState([])
    const [user, setUser] = useContext(LoggedInUserContext);
    const [orders,setOrders] = useState({});
    const [productList,setProductList] = useState([]);
    const foundProducts = [];

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
            productIds.forEach((productId) => {
            const orderedProducts = productList.filter((product) => product.id === productId);
            foundProducts.push(...orderedProducts);
        });
        }
    });

    if (foundProducts.length === 0) {
        return <h2>Nincs rendelésed!</h2>;
    }
   
    return (
        <>
        <ul>
        {foundProducts.map((product, index) => (
            <li key={index}>
                <div>
                    <h2>{product.title}</h2>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                </div>
            </li>
        ))}
        </ul>
        </>
    );
}