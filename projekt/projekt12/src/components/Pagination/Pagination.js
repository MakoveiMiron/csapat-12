import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../Constans/firebaseConstans";
import formatData from "../../Utils/formdata";

const Pagination = ({ pageLimit }) => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// console.log(totalPages);

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
			console.log(data);
			console.log(products);
			setTotalPages(Math.ceil(formatData(data).length / pageLimit));
		};
		fetchProducts();
	}, [pageLimit]);

	const handleNextPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div>
			{products
				.slice((currentPage - 1) * pageLimit, currentPage * pageLimit)
				.map((product) => (
					// console.log(product.id),
					<div key={product.id}>{product.title}</div>
				))}
			<div>
				{currentPage >= 1 && (
					<Link
						to={`/termekek/?page=${currentPage - 1}`}
						onClick={handlePrevPage}
					>
						Prev
					</Link>
				)}

				{currentPage > totalPages && (
					<Link
						to={`/termekek/?page=${currentPage + 1}`}
						onClick={handleNextPage}
					>
						Next
					</Link>
				)}
			</div>
			{/* <div className="pagination">
				<button disabled={currentPage === 1} onClick={handlePrevPage}>
					Prev
				</button>
				<button disabled={currentPage === totalPages} onClick={handleNextPage}>
					Next
				</button>
			</div> */}
		</div>
	);
};

export default Pagination;
