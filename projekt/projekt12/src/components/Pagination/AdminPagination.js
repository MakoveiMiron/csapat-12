import "./pagination.css";
import React, { useState, useEffect} from "react";
import { API_URL } from "../../Constans/firebaseConstans";
import formatData from "../../Utils/formdata";
import { SelectSort } from "../Products/SelectSort";
import AdminProductCard from "../Admin products/AdminProductCard";

function AdminPagination(props){
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		query.set("page", currentPage);
		window.history.pushState(null, "", `?${query.toString()}`);
	}, [currentPage]);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch(`${API_URL}/termekek.json`);
			const data = await response.json();
			setProducts(formatData(data));
			setTotalPages(Math.ceil(formatData(data).length / props.pageLimit));
		};
		fetchProducts();
	}, [props.pageLimit]);

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const handlePrevPage = () => {
		setCurrentPage(currentPage - 1);
	};

	return (
		<>
			<SelectSort setProducts={setProducts} currentPage={currentPage} />
			<div>
				{products
					.slice((currentPage - 1) * props.pageLimit, currentPage * props.pageLimit)
					.map((product) => (
						<AdminProductCard id={product.id} product={product}/>
					))}
				<div className="pagination-box">
					<div>
						{currentPage > 1 && <button onClick={handlePrevPage}>Prev</button>}

						{currentPage < totalPages && (
							<button onClick={handleNextPage}>Next</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminPagination;
