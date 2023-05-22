import { createProduct} from "../../services/Crud";
import { uploadImg } from "../../services/Crud";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app } from "../../constans/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "./CreateProduct.css";

export default function CreateProduct() {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [file, setFile] = useState(null);

	function titlechange(e) {
		setTitle(e.target.value);
	}

	function pricechange(e) {
		setPrice(e.target.value);
	}

	function descriptionchange(e) {
		setDescription(e.target.value);
	}


	function fileChange(event){
    	setFile(event.target.files[0]);
	}

	function fileUpload(id){
		const storage = getStorage(app);
     	const fileRef = ref(storage, "images/"+file.name);

    	return uploadBytes(fileRef, file)
     		.then((uploadResult) => {
        		getDownloadURL(uploadResult?.ref)
				.then(url => uploadImg(url, id.id))
      		})
	}

	function handleSubmit(e) {
		e.preventDefault();
		createProduct(price, title, description)
		.then((data) => data.json())
		.then(id => fileUpload(id))
		/*
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
		*/
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

				<label htmlFor="upload">File feltöltés</label>
				<input
					name="image"
					type="file"
					onChange={fileChange}
				/>
				<button type="submit">Create product</button>
			</form>
		</div>
		</>
	);
}
