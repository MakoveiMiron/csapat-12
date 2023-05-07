import "./pagination.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../Constans/firebaseConstans";
import formatData from "../../Utils/formdata";

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
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	return (
		<div>
			{products
				.slice((currentPage - 1) * pageLimit, currentPage * pageLimit)
				.map((product) => (
					<div key={product.id}>{product.title}</div>
				))}
			<div className="pagination-box">
				{currentPage >= 1 && (
					<Link
						className="pagination"
						to={`/termekek/?page=${currentPage - 1}`}
						onClick={handlePrevPage}
					>
						Prev
					</Link>
				)}

				<Link
					className="pagination"
					to={`/termekek/?page=${currentPage + 1}`}
					onClick={handleNextPage}
				>
					Next
				</Link>
			</div>
		</div>
	);
};

export default Pagination;
