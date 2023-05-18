import { createProduct} from "../../services/Crud";
import { uploadImg } from "../../services/Crud";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app } from "../../constans/firebaseConfig";
import {getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';

export default function CreateProduct() {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const navigate = useNavigate();
	const [file, setFile] = useState(null);
	const [uploadedUrl, setUploadedUrl] = useState(null);
	const [imageList, setImageList] = useState([]);

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
			console.log(event.target.files);
    		setFile(event.target.files[0]);
		}

		function fileUpload(id){
			const storage = getStorage(app);
     		const fileRef = ref(storage, "images/"+file.name);

      		return uploadBytes(fileRef, file)
      		.then((uploadResult) => {
        		console.log(uploadResult);
        		getDownloadURL(uploadResult?.ref)
				.then(url => uploadImg(url, id.id))
      		})
			
		}

	



	function handleSubmit(e) {
		e.preventDefault();
		//fileUpload()
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
			<form onSubmit={handleSubmit}>
				<label htmlFor="Title">Termék neve:</label>
				<input
					name="Title"
					type="text"
					value={title}
					onChange={titlechange}
					required
				/>

				<label htmlFor="Price">Ár</label>
				<input
					name="Price"
					type="number"
					value={price}
					onChange={pricechange}
					required
				/>

				<label htmlFor="Description">Leírás</label>
				<input
					name="Description"
					type="text"
					value={description}
					onChange={descriptionchange}
					required
				/>

				<label htmlFor="Upload">File feltöltés</label>
				<input
					name="image"
					type="file"
					onChange={fileChange}
				/>
				<button type="submit">Create product</button>
			</form>
		</>
	);
}
