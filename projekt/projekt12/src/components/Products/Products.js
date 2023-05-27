import { useEffect, useState, useContext } from "react";
import Pagination from "../pagination/Pagination";
import Searchbar from "../searchBar/Searchbar";
import AdminProductCard from "../admin/adminProducts/AdminProductCard";
import ProductCard from "../webshop/productCard/ProductCard";
import { readProducts } from "../../services/Crud";
import { SelectSort } from "./SelectSort";
import { AdminContext } from "../../contexts/AdminContext";
import { useLocation } from "react-router-dom";
import "./Product.css";

export default function Products() {
	const [productList, setProductList] = useState([]);
	const [sortedList, setSortedList] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentTable, setCurrentTable] = useState([]);
	const [total, setTotal] = useState(0);
	const [isAdmin, setisAdmin] = useContext(AdminContext);
	const location = useLocation();

	const limit = 9;

	useEffect(() => {
		readProducts().then((products) => {
			setProductList(Object.values(products));
			setSortedList(Object.values(products));
			changeCurrentProducts(Object.values(products));
		});
	}, []);

	function changeCurrentProducts(currentProducts) {
		setTotal(currentProducts.length);
		const firstPageIndex = (currentPage - 1) * limit;
		const lastPageIndex = firstPageIndex + limit;
		const currentTableData = currentProducts.slice(firstPageIndex, lastPageIndex);
		setCurrentTable(currentTableData);
	}

	useEffect(() => {
		changeCurrentProducts(sortedList);
	}, [currentPage, sortedList, productList]);

	return (
		<div className="product-container">
			
			<div className="products-aside">
				<Searchbar
					setSortedList={setSortedList}
					productList={productList}
					changeCurrentProducts={changeCurrentProducts}
					setCurrentTable={setCurrentTable}
					setFilteredProducts={setFilteredProducts}
					filteredProducts={filteredProducts}
				/>
				<SelectSort
					products={sortedList}
					setCurrentTable={setCurrentTable}
					setSortedList={setSortedList}
				/>
			</div>

			<div className="products-main">
				<div className="pagination-container">
					<Pagination
						total={total}
						currentPage={currentPage}
						limit={limit}
						onPageChange={setCurrentPage}
					/>
				</div>
			
				{isAdmin && location.pathname.includes("/admin") ? (
					<div className="products">
						{currentTable.map((p) => (
							<AdminProductCard key={p.id} id={p.id} product={p} />
						))}
					</div>
				) : (
					<div className="product-box">
						{currentTable.map((p) => (
							<ProductCard key={p.id} id={p.id} product={p} currentPage={currentPage} />
						))}
					</div>
				)}
				<div className="pagination-container">
					<Pagination
						total={total}
						currentPage={currentPage}
						limit={limit}
						onPageChange={setCurrentPage}
					/>
				</div>
			</div>
		</div>
	);
}
