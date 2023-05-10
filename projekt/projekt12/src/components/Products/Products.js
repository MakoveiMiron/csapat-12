import { readProducts } from "../../Services/Crud";
import { useEffect, useState } from "react";
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
			<Pagination products={productList} pageLimit={2} />
		</>
	);
}
