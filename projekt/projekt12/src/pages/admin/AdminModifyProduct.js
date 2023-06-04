import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct, readProducts } from "../../services/Crud";
import formatData from "../../utils/formdata";
import "./AdminModifyProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app } from "../../constans/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadImg } from "../../services/Crud";
import { getCategoryList } from "../../services/Crud";
import InputValidation from "../../utils/InputValidation";
import { validateInput } from "../../utils/InputValidation";

const AdminModifyProduct = () => {
	const [productModify, setProductModify] = useState(null);
	const [newTitle, setNewTitle] = useState("");
	const [newPrice, setNewPrice] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newUrl, setNewUrl] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();
	const [category, setCategory] = useState("");
	const [categoryList, setCategoryList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await readProducts();
				const formattedData = formatData(data);
				const productToModify = formattedData.find((product) => product.id === id);
				setProductModify(productToModify);
				setNewTitle(productToModify.title);
				setNewPrice(productToModify.price);
				setNewDescription(productToModify.description);
				setNewUrl(productToModify.url);
				setCategory(productToModify.categoryId);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [id]);

	useEffect(() => {
		const fetchCategoryList = async () => {
			try {
				const json = await getCategoryList();
				setCategoryList(Object.values(json));
			} catch (error) {
				console.log(error);
			}
		};

		fetchCategoryList();
	}, []);

	const handleTitleChange = (e) => {
		setNewTitle(e.target.value);
	};

	const handlePriceChange = (e) => {
		setNewPrice(e.target.value);
	};

	const handleDescChange = (e) => {
		setNewDescription(e.target.value);
	};

	const handleUrlChange = (event) => {
		setNewUrl(event.target.files[0]);
	};

	const categoryChange = (e) => {
		setCategory(e.target.value);
	};

	const fileUpload = (id) => {
		const storage = getStorage(app);
		const fileRef = ref(storage, "images/" + newUrl.name);

		return uploadBytes(fileRef, newUrl).then((uploadResult) => {
			getDownloadURL(uploadResult?.ref).then((url) => uploadImg(url, id));
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validateInput(newTitle, newPrice)) {
			return;
		}

		updateProduct(id, newTitle, newPrice, newDescription, category)
			.then(() => fileUpload(id))
			.then(() => {
				navigate("/admin/termekek");
				toast.success("Termék sikeresen módosítva!", {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.catch((error) => {
				toast.error(
					`Hiba történt a termék módosítása közben: ${console.log(error.message)}`,
					{
						position: toast.POSITION.TOP_RIGHT,
					}
				);
			});
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<InputValidation
					label="Új név:"
					type="text"
					name="title"
					value={newTitle}
					onChange={handleTitleChange}
				/>

				<InputValidation
					label="Új ár:"
					type="number"
					name="price"
					value={newPrice}
					onChange={handlePriceChange}
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

				<label htmlFor="category">kategóriák</label>
				<select value={category} onChange={categoryChange}>
					<option key={0} value="">
						Válassz kategóriát!
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
				<input name="image" type="file" onChange={handleUrlChange} />

				<button type="submit">Mentés</button>
			</form>
			<button onClick={() => navigate("/admin/termekek")}>Mégsem</button>
		</>
	);
};

export default AdminModifyProduct;
