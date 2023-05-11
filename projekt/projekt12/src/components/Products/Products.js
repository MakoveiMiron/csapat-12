import { readProducts } from "../../Services/Crud";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import formatData from "../../Utils/formdata";
import Searchbar from "../SearchBar/Searchbar";
import { SelectSort } from "./SelectSort";

export default function Products() {
	const [productList, setProductList] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([])
	useEffect(() => {
		readProducts().then((products) => {
			setProductList(formatData(products));
		});
	}, []);

	useEffect(() => {
		setFilteredProducts(productList);
	},[productList])

	

	return (
		<>	
		<div className="product-page">
			<div className="fill-menu">
			<SelectSort setProducts={setFilteredProducts} />
			<Searchbar productList={productList} setFilteredProducts={setFilteredProducts} />
			</div>
			<Pagination products={filteredProducts} pageLimit={9} />
		</div>
		</>
	);
}
