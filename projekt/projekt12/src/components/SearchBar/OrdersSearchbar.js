import "./Searchbar.css";
import { useState } from "react";
import { FiSearch, FiDelete } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const OrdersSearchbar = (props) => {
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const [sortedList,setList] = useState(props.orders);

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchButtonClick = () => {
    if (location.pathname.includes("/megrendeleseim")) {
      const filtered = props.orders.filter(
        (order) => order.uid.includes(searchText) || order.id.includes(searchText)
      );
      props.setSortedList(filtered);
    } else {
      const filtered = props.customers.filter(
        (customer) =>
          customer.uid.includes(searchText) || customer.name.includes(searchText)
      );
      props.setSortedList(filtered);
    }
  };

  const handleResetButtonClick = () => {
    if (location.pathname.includes("/megrendeleseim")) {
		setSearchText("");
		props.setSortedList(sortedList);
    } else {
      props.setSortedList(props.customers);
    }
  };

  return (
    <div className="filter">
      <input
        className="searchInput"
        type="text"
        placeholder="Keresés"
        value={searchText}
        onChange={handleSearchInputChange}
      />
      <button className="searchButton" onClick={handleSearchButtonClick}>
        <FiSearch />
      </button>
      <button className="searchButtonBack" onClick={handleResetButtonClick}>
        <FiDelete />
      </button>
    </div>
  );
};

export default OrdersSearchbar;
