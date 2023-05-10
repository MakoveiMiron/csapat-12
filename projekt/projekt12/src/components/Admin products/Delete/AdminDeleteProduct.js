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
			formatData(data);
			setProductDelete(data.title);
		});
	}, [id]);

	const deleteProductfgv = () => {
		deleteProduct(id).then((json) => navigate("/admin/termekek"));
	};

	return (
		<div className="delete-product">
			<button className="delete-btn" onClick={deleteProductfgv}>
				Törlés
			</button>
			<button className="cancel-btn" onClick={() => navigate("/admin/termekek")}>
				Mégse
			</button>
		</div>
	);
}
