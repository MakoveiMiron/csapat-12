import { readProducts } from "../../Services/Crud";
import { useEffect, useState } from "react";
import formatData from "../../Utils/formdata";
import Pagination from "../Pagination/Pagination";

export default function AdminProducts() {
	const [productList, setProductList] = useState([]);

	useEffect(() => {
		readProducts().then((products) => setProductList(formatData(products)));
	}, []);

	return (
		<>
			<h1>Admin termékek</h1>

			<Pagination products={productList} pageLimit={9} />
		</>
	);
}
