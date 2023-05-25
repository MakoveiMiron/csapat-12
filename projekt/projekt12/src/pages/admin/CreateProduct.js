import { createProduct } from "../../services/Crud";
import { uploadImg } from "../../services/Crud";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app } from "../../constans/firebaseConfig";
import "./CreateProduct.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import getCategoryList from "../../services/Crud";
import { Navigate } from "react-router-dom";

export default function CreateProduct() {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [file, setFile] = useState(null);
	const [category, setCategory] = useState("");
	const [categoryList, setCategoryList] = useState([]);

	useEffect(() => {
		getCategoryList().then((json) => setCategoryList(Object.values(json)));
	}, []);

	function titlechange(e) {
		setTitle(e.target.value);
	}

	function pricechange(e) {
		setPrice(e.target.value);
	}

	function descriptionchange(e) {
		setDescription(e.target.value);
	}

	function fileChange(event) {
		setFile(event.target.files[0]);
	}
	function categoryChange(e) {
		setCategory(e.target.value);
	}

	function fileUpload(file) {
		const storage = getStorage(app);
		const fileRef = ref(storage, "images/" + file.name);

		return uploadBytes(fileRef, file)
			.then((uploadResult) => getDownloadURL(uploadResult?.ref))
			.catch((error) => {
				console.log(error.message);
			});
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (file) {
			fileUpload(file)
				.then((url) => {
					// Termék létrehozása a feltöltött fájl URL-jével
					return createProduct(price, title, description, category, url);
				})
				.then(() => {
					toast.success("Termék sikeresen létrehozva!", {
						position: toast.POSITION.TOP_RIGHT,
					});
					<Navigate to="/admin/termekek" />;
				})
				.catch((error) => {
					toast.error(error.message, {
						position: toast.POSITION.TOP_RIGHT,
					});
				});
		} else {
			// Ha nincs fájl, akkor csak a termék létrehozása történik
			createProduct(price, title, description, category)
				.then(() => {
					toast.success("Termék sikeresen létrehozva!", {
						position: toast.POSITION.TOP_RIGHT,
					});
					<Navigate to="/admin/termekek" />;
				})
				.catch((error) => {
					toast.error(error.message, {
						position: toast.POSITION.TOP_RIGHT,
					});
				});
		}
	}
	return (
		<>
		<div className="create-product">
			<form onSubmit={handleSubmit} className="product-form">
				<label htmlFor="title">Termék neve:</label>
				<input
					name="title"
					type="text"
					value={title}
					onChange={titlechange}
					required
				/>

				<label htmlFor="price">Ár:</label>
				<input
					name="price"
					type="number"
					value={price}
					onChange={pricechange}
					required
				/>

				<label htmlFor="description">Leírás:</label>
				<input
					name="description"
					type="text"
					value={description}
					onChange={descriptionchange}
					required
				/>
				<label htmlFor="category">kategóriák</label>
				<select value={""} onChange={categoryChange}>
					<option key={0} value={""}>
						besorolatlan
					</option>
					{categoryList.map((category, idx) => {
						return (
							<option key={idx + 1} value={category.id}>
								{category.name}
							</option>
						);
					})}
				</select>

				<label htmlFor="upload">File feltöltés</label>
				<input name="image" type="file" onChange={fileChange} />
				<button type="submit">Create product</button>
			</form>
		</div>
		</>
	);
}
