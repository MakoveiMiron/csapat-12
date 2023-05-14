import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readProducts, updateProduct } from "../../../Services/Crud";
import formatData from "../../../Utils/formdata";
import "./AdminModifyProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminModifyProduct() {
	const [productModify, setProductModify] = useState("");
	const [newTitle, setNewTitle] = useState("");
	const [newPrice, setNewPrice] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		readProducts().then((data) => {
			const productToModify = formatData(data).find(
				(product) => product.id === id
			);
			setProductModify(productToModify);
			setNewTitle(productModify.title);
			setNewPrice(productModify.price);
			setNewDescription(productModify.description);
		});
	}, [id, productModify.title, productModify.price, productModify.description]);

	function handleTitleChange(e) {
		setNewTitle(e.target.value);
	}

	function handlePriceChange(e) {
		setNewPrice(e.target.value);
	}

	function handleDescChange(e) {
		setNewDescription(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		updateProduct(id, newTitle, newPrice, newDescription)
			.then(() => {
				navigate("/admin/termekek");
				toast.success("Termék sikeresen módosítva!", {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.catch((error) => {
				toast.error(`Hiba történt a termék módosítása közben: ${error.message}`, {
					position: toast.POSITION.TOP_RIGHT,
				});
			});
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Új név:</label>
				<input
					className="input"
					maxLength={100}
					id="title"
					type="text"
					value={newTitle}
					onChange={handleTitleChange}
					required
				/>

				<label htmlFor="price">Új ár:</label>
				<input
					className="input"
					id="price"
					type="number"
					value={newPrice}
					onChange={handlePriceChange}
					required
				/>

				<label htmlFor="description">Új leírás:</label>
				<input
					rows={8}
					cols={30}
					id="description"
					type="text"
					value={newDescription}
					onChange={handleDescChange}
					required
				/>

				<button type="submit">Mentés</button>
			</form>
			<button onClick={() => navigate("/admin/termekek")}>Mégsem</button>
		</>
	);
}
