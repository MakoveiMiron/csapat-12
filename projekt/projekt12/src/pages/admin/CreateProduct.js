import { createProduct } from "../../services/Crud";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProduct() {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const navigate = useNavigate();

	function Titlechange(e) {
		setTitle(e.target.value);
	}

	function Pricechange(e) {
		setPrice(e.target.value);
	}

	function Descriptionchange(e) {
		setDescription(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const result = createProduct(price, title, description);
		if (result.error) {
			toast.error(result.message, {
				position: toast.POSITION.TOP_RIGHT,
			});
		} else {
			navigate("/admin/termekek");
			toast.success("Termék sikeresen létrehozva!", {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="Title">Termék neve:</label>
				<input
					name="Title"
					type="text"
					value={title}
					onChange={Titlechange}
					required
				/>

				<label htmlFor="Price">Ár</label>
				<input
					name="Price"
					type="number"
					value={price}
					onChange={Pricechange}
					required
				/>

				<label htmlFor="Description">Leírás</label>
				<input
					name="Description"
					type="text"
					value={description}
					onChange={Descriptionchange}
					required
				/>

				<button type="submit">Create product</button>
			</form>
		</>
	);
}
