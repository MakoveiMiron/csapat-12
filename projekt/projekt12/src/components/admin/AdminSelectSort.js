import "../products/SelectSort.css";
import { orderfromAtoZ, orderfromZtoA } from "../../utils/orderSorting";
import { customersfromAtoZ, customersfromZtoA } from "../../utils/userSorting";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

export default function AdminSelectSort(props) {
	const [sortDirection, setDirection] = useState("increasing");
	const prevSortDirectionRef = useRef(sortDirection);
	const location = useLocation();

	useEffect(() => {
		if (prevSortDirectionRef.current !== sortDirection) {
			const query = new URLSearchParams(window.location.search);
			query.set("sortOrientation", sortDirection);
			window.history.pushState(null, "", `?${query.toString()}`);
			prevSortDirectionRef.current = sortDirection;
		}
	}, [sortDirection]);

	function handleChange(e) {
		if (location.pathname.includes("/admin/megrendelesek")) {
			if (e.target.value === "a-z") {
				setDirection("increasing");
				const sortedProducts = orderfromAtoZ(props.products);
				props.setSortedList(sortedProducts);
			} else if (e.target.value === "z-a") {
				setDirection("decreasing");
				const sortedProducts = orderfromZtoA(props.products);
				props.setSortedList(sortedProducts);
			}
		} 
		else if(location.pathname.includes("/megrendeleseim")){
			if (e.target.value === "a-z") {
				setDirection("increasing");
				const sortedOrders = orderfromAtoZ(props.orders);
				props.setSortedList(sortedOrders);
			} else if (e.target.value === "z-a") {
				setDirection("decreasing");
				const sortedOrders = orderfromZtoA(props.orders);
				props.setSortedList(sortedOrders);
			}
		}
		else {
			if (e.target.value === "a-z") {
				setDirection("increasing");
				const sortedCustomers = customersfromAtoZ(props.customers);
				props.setSortedList(sortedCustomers);
			} else if (e.target.value === "z-a") {
				setDirection("decreasing");
				const sortedCustomers = customersfromZtoA(props.customers);
				props.setSortedList(sortedCustomers);
			}
		}
	}

	return (
		<>
			<div className="sort-box">
				<p className="sort-text">Szűrés:</p>
				<select onChange={(e) => handleChange(e)} className="select-box">
					<option value="a-z">a-z (id)</option>
					<option value="z-a">z-a (id)</option>
				</select>
			</div>
		</>
	);
}
