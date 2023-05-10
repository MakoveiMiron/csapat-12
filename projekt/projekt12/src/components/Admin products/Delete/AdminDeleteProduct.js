import "./AdminDeleteProduct.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct, readProducts } from "../../../Services/Crud";
import formatData from "../../../Utils/formdata";

export default function AdminDeleteProduct() {
	const [productDelete, setProductDelete] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		readProducts().then((data) => {
			const productToDelete = formatData(data).find(
				(product) => product.id === id
			);
			setProductDelete(productToDelete.title);
		});
	}, [id]);
	const deleteProductfgv = () => {
		deleteProduct(id).then((json) => navigate("/admin/termekek"));
	};

	return (
		<div className="delete-product">
			<h3>
				Biztosan törölni
				<span className="delete-product-card">{productDelete}</span> szeretnéd ?
			</h3>
			<button className="delete-btn" onClick={deleteProductfgv}>
				Törlés
			</button>
			<button className="cancel-btn" onClick={() => navigate("/admin/termekek")}>
				Mégse
			</button>
		</div>
	);
}
