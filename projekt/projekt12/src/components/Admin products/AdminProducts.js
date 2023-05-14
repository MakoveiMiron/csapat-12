import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import Searchbar from "../SearchBar/Searchbar";
import ProductCard from "../Products/ProductCard";
import { readProducts } from "../../Services/Crud";
import { SelectSort } from "../Products/SelectSort";

export default function AdminProducts() {
	const [productList, setProductList] = useState([]);
	const [sortedList, setSortedList] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentTable, setCurrentTable] = useState([]);
	const [total, setTotal] = useState(0);
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
		<div className="product-page">
			<div className="pagination-container">
				<Pagination
					total={total}
					currentPage={currentPage}
					limit={limit}
					onPageChange={setCurrentPage}
				/>
			</div>
			<div className="fill-menu">
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
			<div className="product-box">
				{currentTable.map((p) => (
					<ProductCard key={p.id} id={p.id} product={p} />
				))}
			</div>
			<div className="pagination-container">
				<Pagination
					total={total}
					currentPage={currentPage}
					limit={limit}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	);
}
