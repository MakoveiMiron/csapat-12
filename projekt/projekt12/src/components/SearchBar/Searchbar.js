import "./Searchbar-style.css";
import { useState } from "react";
import { FiSearch, FiDelete } from "react-icons/fi";

const Searchbar = (props) => {
	const [searchText, setSearchText] = useState("");
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");

	const handleSearchInputChange = (event) => {
		setSearchText(event.target.value.toLowerCase());
	};

	const handleMinPriceInputChange = (event) => {
		setMinPrice(event.target.value);
	};

	const handleMaxPriceInputChange = (event) => {
		setMaxPrice(event.target.value);
	};

	const handleSearchButtonClick = () => {
		const filtered = props.productList.filter(
			(product) =>
				product.title.toLowerCase().includes(searchText) &&
				(minPrice === "" || product.price >= parseFloat(minPrice)) &&
				(maxPrice === "" || product.price <= parseFloat(maxPrice))
		);

		props.setSortedList(filtered);
	};

	const handleResetButtonClick = () => {
		setSearchText("");
		setMinPrice("");
		setMaxPrice("");
		props.setSortedList(props.productList);
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
			<input
				className="searchInput"
				type="number"
				placeholder="Minimum ár"
				value={minPrice}
				onChange={handleMinPriceInputChange}
			/>
			<input
				className="searchInput"
				type="number"
				placeholder="Maximum ár"
				value={maxPrice}
				onChange={handleMaxPriceInputChange}
			/>
			<button className="searchButton" onClick={handleSearchButtonClick}>
				<FiSearch />
			</button>
			<button className="searchButtonBack" onClick={handleResetButtonClick}>
				<FiDelete />
			</button>
			<button onClick={handleSearchButtonClick}>Keresés</button>
			<button onClick={handleResetButtonClick}>Visszaállítás</button>
		</div>
	);
};

export default Searchbar;
