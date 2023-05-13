import "./SelectSort.css";
import {
	fromAtoZ,
	fromZtoA,
	fromLowToHigh,
	fromHighToLow,
} from "../../Utils/ProductSorting";
import { useState, useEffect } from "react";

export function SelectSort(props) {
	const [sortDirection, setDirection] = useState("increasing");

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		query.set("sortOrientation", sortDirection);
		window.history.pushState(null, "", `?${query.toString()}`);
	}, [sortDirection]);

	function handleChange(e) {
		if (e.target.value === "a-z") {
			setDirection("increasing");
			const sortedProducts = fromAtoZ(props.products);
			props.setSortedList(sortedProducts);
		} else if (e.target.value === "z-a") {
			setDirection("decreasing");
			const sortedProducts = fromZtoA(props.products);
			props.setSortedList(sortedProducts);
		} else if (e.target.value === "low-high") {
			setDirection("low-high");
			const sortedProducts = fromLowToHigh(props.products);
			props.setSortedList(sortedProducts);
		} else if (e.target.value === "high-low") {
			setDirection("high-low");
			const sortedProducts = fromHighToLow(props.products);
			props.setSortedList(sortedProducts);
		}
	}

	return (
		<>
			<div className="sort-box">
				<p className="sort-text">Szűrés:</p>
				<select onChange={(e) => handleChange(e)} className="select-box">
					<option value="a-z">a-z</option>
					<option value="z-a">z-a</option>
					<option value="low-high">ár növekvő</option>
					<option value="high-low">ár csökkenő</option>
				</select>
			</div>
		</>
	);
}
