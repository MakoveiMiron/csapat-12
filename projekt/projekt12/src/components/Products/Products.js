import { readProducts } from "../../Services/Crud";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { SelectSort } from "./SelectSort";
import Pagination from "../Pagination/Pagination";
import formatData from "../../Utils/formdata";

export default function Products() {
	const [productList, setProductList] = useState([]);

	useEffect(() => {
		readProducts().then((products) => {
			setProductList(formatData(products));
		});
	}, []);

	return (
		<>
			<SelectSort setProductList={setProductList} />
			<Pagination pageLimit={2} />
		</>
	);
}
