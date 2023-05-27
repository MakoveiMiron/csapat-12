import { useContext, useState, useEffect } from "react";
import { getOrderIds, readProducts } from "../../services/Crud";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import "./Orders.css";
import { deleteOrder } from "../../services/authCrud";
import { toast } from "react-toastify";
import OrdersSearchbar from "../../components/searchBar/OrdersSearchbar";
import AdminSelectSort from "../../components/admin/AdminSelectSort";
import Pagination from "../../components/pagination/Pagination";

export default function AdminOrders() {
  const [productList, setProductList] = useState([]);
  const [user, setUser] = useContext(LoggedInUserContext);
  const [sortedList, setSortedList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentTable, setCurrentTable] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    getOrderIds().then(resp => {
      const userOrders = Object.values(resp).filter(order => order.uid === user.uid);
      setSortedList(userOrders);
    });
  }, [user]);

  useEffect(() => {
    readProducts().then(resp => {
      setProductList(resp);
    });
  }, []);

  function changeCurrentOrders(currentProducts) {
    setTotal(currentProducts.length);
    const firstPageIndex = (currentPage - 1) * limit;
    const lastPageIndex = firstPageIndex + limit;
    const currentTableData = currentProducts.slice(firstPageIndex, lastPageIndex);
    setCurrentTable(currentTableData);
}

useEffect(() => {
    changeCurrentOrders(sortedList);
    console.log(sortedList)
}, [currentPage, sortedList, productList]);

function listProducts(orderId) {
    const order = sortedList.find(ord => ord.id === orderId);
    if (order) {
      return Object.entries(order.products);
    }
    return [];
  }

  function productName(id) {
    let title;
    Object.values(productList).forEach(product => {
      if (id === product.id) {
        title = product.title;
      }
    });
    return title;
  }

  function productPrice(id) {
    let price;
    Object.values(productList).forEach(product => {
      if (id === product.id) {
        price = product.price;
      }
    });
    return price;
  }

  function removeOrder(orderId) {
    try {
      deleteOrder(orderId); 
      setSortedList(prevList => prevList.filter(order => order.id !== orderId));
      setCurrentTable(prevList => prevList.filter(order => order.id !== orderId));
      toast.success("Sikeresen törölted a megrendelést!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      toast.error("Hiba a megrendelés törlésekor!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  if (!user) return <h1>Ehhez be kell jelentkezned előbb!</h1>;
  if (sortedList.length === 0) return <h1>Nincsenek rendeléseid!</h1>;

  return (
    <>
      <h1>Rendeléseim</h1>
      <div className="pagination-container">
        <Pagination
          total={total}
          currentPage={currentPage}
          limit={limit}
          onPageChange={setCurrentPage}
        />
      </div>
      <OrdersSearchbar
        setSortedList={setSortedList}
        orders={sortedList}
        changeCurrentOrders={changeCurrentOrders}
        setCurrentTable={setCurrentTable}
        setFilteredProducts={setFilteredProducts}
      />

      <AdminSelectSort 
        orders={sortedList} 
        setSortedList={setSortedList} 
      />
      <div className="orders-container">
      {currentTable && currentTable.map(order => (
  <div className="order-card" key={order.id}>
    <h2>Rendelés ID: {order.id}</h2>
    <ul>
      {listProducts(order.id).map(id => (
        <li key={id}>
          {`${id[1]}db `} {productName(id[0])} {productPrice(id[0]) * id[1]}Ft
        </li>
      ))}
    </ul>
    <button onClick={() => removeOrder(order.id)}>Rendelés visszavonása</button>
  </div>
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
    </>
  );
}
