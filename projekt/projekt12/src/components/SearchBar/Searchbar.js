// import "./Searchbar-style.css";
// import { useState } from "react";

// const Searchbar = (props) => {
// 	const [value, setValue] = useState("");

// 	const onChange = (event) => {
// 		let text = event.target.value;
// 		setValue(text.toLowerCase()); /// ez majd extrahoz kell
// 	};

// 	function handleClick() {
// 		const filtered = props.productList.filter((product) =>
// 			product.title.toLowerCase().includes(value)
// 		);

// 		console.log(filtered);
// 		props.setSortedList(filtered);
// 	}

// 	function allProducts() {
// 		props.setSortedList(props.productList);
// 	}

// 	return (
// 		<div className="Filter">
// 			<input type="text" value={value} onChange={onChange} />
// 			<button onClick={allProducts}>x</button>
// 			<button onClick={handleClick}>Kereses</button>
// 		</div>
// 	);
// };

// export default Searchbar;

import "./Searchbar-style.css";
import { useState } from "react";

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
				type="text"
				placeholder="Keresés"
				value={searchText}
				onChange={handleSearchInputChange}
			/>
			<input
				type="number"
				placeholder="Minimum ár"
				value={minPrice}
				onChange={handleMinPriceInputChange}
			/>
			<input
				type="number"
				placeholder="Maximum ár"
				value={maxPrice}
				onChange={handleMaxPriceInputChange}
			/>
			<button onClick={handleSearchButtonClick}>Keresés</button>
			<button onClick={handleResetButtonClick}>Visszaállítás</button>
		</div>
	);
};

export default Searchbar;
