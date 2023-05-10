import "./pagination.css";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../Constans/firebaseConstans";
import formatData from "../../Utils/formdata";
import { SelectSort } from "../Products/SelectSort";
import ProductCard from "../Products/ProductCard";
import AdminProductCard from "../Admin products/AdminProductCard";
import { useLocation } from "react-router-dom";
function Pagination(props) {
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

	const isAdmin = useLocation().pathname.startsWith("/admin");

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const handlePrevPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const handleFirstPage = () => {
		setCurrentPage(1);
	};

	const handleLastPage = () => {
		setCurrentPage(totalPages);
	};

	const handlePrevThreePages = () => {
		setCurrentPage(Math.max(1, currentPage - 3));
	};

	const handleNextThreePages = () => {
		setCurrentPage(Math.min(totalPages, currentPage + 3));
	};

	return (
		<>
			<SelectSort setProducts={setProducts} currentPage={currentPage} />
			<div>
				{isAdmin &&
					props.products
						.slice(
							(currentPage - 1) * props.pageLimit,
							currentPage * props.pageLimit
						)
						.map((product) => (
							<AdminProductCard
								key={product.id}
								id={product.id}
								product={product}
							/>
						))}

				{!isAdmin &&
					props.products
						.slice(
							(currentPage - 1) * props.pageLimit,
							currentPage * props.pageLimit
						)
						.map((product) => (
							<ProductCard key={product.id} id={product.id} product={product} />
						))}
				<div className="pagination-box">
					<div>
						
							<>
								<button onClick={handleFirstPage}>First</button>
								<button onClick={handlePrevPage}>Prev</button>
							</>
						

						{currentPage > 4 && (
							<>
								<button onClick={handlePrevThreePages}>
									{currentPage - 3}
								</button>
								<button onClick={handlePrevThreePages}>
									{currentPage - 2}
								</button>
								<button onClick={handlePrevThreePages}>
									{currentPage - 1}
								</button>
							</>
						)}

						{currentPage < totalPages - 3 && (
							<>
								<button onClick={handleNextThreePages}>
									{currentPage + 1}
								</button>
								<button onClick={handleNextThreePages}>
									{currentPage + 2}
								</button>
								<button onClick={handleNextThreePages}>
									{currentPage + 3}
								</button>
							</>
						)}

						{currentPage < totalPages && (
							<>
								<button onClick={handleNextPage}>Next</button>
								<button onClick={handleLastPage}>Last</button>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
export default Pagination;
