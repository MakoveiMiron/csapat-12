import { useState, useEffect } from "react"
import { getOrderIds, readProducts, } from "../../services/Crud";
import { readUsers } from "../../services/authCrud";
import { useNavigate } from "react-router-dom";
import AdminSearchbar from "../../components/admin/adminSearchbar/AdminSearchbar"
import AdminSelectSort from "../../components/admin/AdminSelectSort";
import Pagination from "../../components/pagination/Pagination";

export default function AdminOrders(){
    const [orders, setOrders] = useState([]);
    const [productList, setProductList] = useState([]);
    const [users,setUsers] = useState([]);
    const [sortedList, setSortedList] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentTable, setCurrentTable] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate()
    const limit = 4;

    useEffect(() => {
        getOrderIds()
        .then(resp =>{
            setOrders(resp)
            setSortedList(Object.values(resp))
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

    function changeCurrentProducts(currentProducts) {
		setTotal(currentProducts.length);
		const firstPageIndex = (currentPage - 1) * limit;
		const lastPageIndex = firstPageIndex + limit;
		const currentTableData = currentProducts.slice(firstPageIndex, lastPageIndex);
		setCurrentTable(currentTableData);
	}

	useEffect(() => {
		changeCurrentProducts(sortedList);
	}, [currentPage, sortedList, productList]);
       
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
                    <div className="pagination-container">
				        <Pagination
					        total={total}
					        currentPage={currentPage}
					        limit={limit}
					        onPageChange={setCurrentPage}
				        />
			        </div>
                    <AdminSearchbar 
                        setSortedList={setSortedList}
				        productList={productList}
                        orders={Object.values(orders)}
				        changeCurrentProducts={changeCurrentProducts}
				        setCurrentTable={setCurrentTable}
				        setFilteredProducts={setFilteredProducts}
				        filteredProducts={filteredProducts}/>

                    <AdminSelectSort 
                        products={sortedList}
                        setSortedList={setSortedList}
                    />
                    <div className="orders-container">
                    {currentTable.map((order,index) => (
                       <>   
                         <div className="order-card">
                            <h2>Rendelés ID: {order.id}</h2>
                            Rendelő adatai:
                                <ul>
                                    <li>Vevő neve: {users.map((user) => {if(order.uid === user.uid){
                                        return user.name
                                        }})}
                                    </li>
                                    <li>Vevő uid: {users.map((user) => {if(order.uid === user.uid){
                                        return user.uid
                                        }})}
                                    </li>
                                </ul>

                                Rendelés tartalma:
                                <ul>
                                    {listProducts(order.id).map(id => <li key={id}>{`${id[1]}db `}{id}{" (termek id)"}</li>)}
                                </ul>
                
                               <button onClick={() => navigate(`/admin/megrendelesek/${order.id}`)}>Adatlap</button>
                            </div>
                        </>
                    ))}
                    </div>
                    <div className="pagination-container">
				        <Pagination
					        total={total}
					        currentPage={currentPage}
					        limit={limit}
					        onPageChange={setCurrentPage}
				        />
			        </div>
                </div>
            </>
        )
    
}
