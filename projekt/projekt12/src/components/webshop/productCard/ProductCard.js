import "./ProductCard.css";
import cartFormatter from "../../../utils/cartFormatter";
import { useContext, useState, useEffect } from "react";
import { readProducts } from "../../../services/Crud";
import { createUsersCart } from "../../../services/authCrud";
import { cartContext } from "../../../contexts/CartContext";
import { readUsers } from "../../../services/authCrud";
import { toast } from "react-toastify";

export default function ProductCard(props) {
	const [productList, setProductList] = useState([]);
	const [cart, setCart] = useContext(cartContext);
	const userId = "2qOcQRARk9PyHRzll7O72ADz8df1";

	useEffect(() => {
		readProducts().then((products) => {
			setProductList(Object.values(products));
		});
	}, []);

	const addToCart = (e) => {
		const item = productList.find((product) => product.id === e.target.name);
		console.log(item);

		createUsersCart(`vasarlok/${userId}/cart`, item)
			.then(() => readUsers(`vasarlok/${userId}/cart`))
			.then((data) => cartFormatter(data))
			.then((formattedData) => {
				setCart(formattedData);
				toast.success("Termék hozzáadva a kosárhoz!", {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.catch((error) => {
				console.error("Hiba a kosárhoz adás közben:", error);
				toast.error("Hiba a kosárhoz adás közben", {
					position: toast.POSITION.TOP_RIGHT,
				});
			});
	};
	return (
		<div className="product-row">
			<div>
				<img src={props.product.url} alt="image" className="image" />
			</div>
			<div className="product-content">
				<h1 className="product-title">{props.product.title}</h1>

				<h3 className="product-description">{props.product.description}</h3>

				<h2 className="product-price">{props.product.price + " Ft"}</h2>

				<button
					className="chart-button"
					name={props.product.id}
					onClick={addToCart}
				>
					Kosárba
				</button>
			</div>
		</div>
	);
}
