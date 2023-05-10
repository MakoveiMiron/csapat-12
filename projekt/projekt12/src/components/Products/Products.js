import { readProducts } from "../../Services/Crud";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import formatData from "../../Utils/formdata";
import Searchbar from "../SearchBar/Searchbar";

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
			<Searchbar productList={productList} setFilteredProducts={setFilteredProducts} />
			<Pagination products={filteredProducts} pageLimit={2} />
		</>
	);
}
