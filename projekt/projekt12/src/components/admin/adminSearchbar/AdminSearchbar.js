import "./AdminSearchbar-style.css";
import { useState } from "react";
import { FiSearch, FiDelete } from "react-icons/fi";

const AdminSearchbar = (props) => {
	const [searchText, setSearchText] = useState("");
	

	const handleSearchInputChange = (event) => {
		setSearchText(event.target.value);
	};

	const handleSearchButtonClick = () => {
		const filtered = props.orders.filter(
			(order) =>
				order.uid.includes(searchText) ||
                order.id.includes(searchText)
		);

		props.setSortedList(filtered);
	};

	const handleResetButtonClick = () => {
		setSearchText("")
		props.setSortedList(props.orders);
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

export default AdminSearchbar;
