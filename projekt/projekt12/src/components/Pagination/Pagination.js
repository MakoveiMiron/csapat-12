import "./pagination.css";
import React, { useState, useEffect, useSearchParams } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../Constans/firebaseConstans";
import formatData from "../../Utils/formdata";
import { SelectSort } from "../Products/SelectSort";

const Pagination = ({ pageLimit }) => {
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
			setTotalPages(Math.ceil(formatData(data).length / pageLimit));
		};
		fetchProducts();
	}, [pageLimit]);

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
					.slice((currentPage - 1) * pageLimit, currentPage * pageLimit)
					.map((product) => (
						<div key={product.id}>{product.title}</div>
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

export default Pagination;
