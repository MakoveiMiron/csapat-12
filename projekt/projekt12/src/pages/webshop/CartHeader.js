import { useState, useContext, useEffect } from "react";
import { readCartProducts } from "../../services/authCrud";
import { CartContext } from "../../contexts/CartContext";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { NavLink } from "react-router-dom";
import { Icon } from "react-icons-kit";

const CartHeader = () => {
	const [cart, setCart] = useContext(CartContext);
	const [totalPrice, setTotalPrice] = useState(0);
	const [productData, setProductData] = useState([]);

	useEffect(() => {
		const fetchCartData = async () => {
			try {
				const productIds = Object.keys(cart);

				if (productIds.length === 0) {
					setProductData([]);
					return;
				}

				const fetchedProducts = await readCartProducts();
				const filteredProducts = fetchedProducts.filter((product) =>
					productIds.includes(product.id)
				);

				setProductData(filteredProducts);
			} catch (error) {
				console.error("Hiba a kosár és termékadatok betöltésekor:", error);
			}
		};

		fetchCartData();
	}, [cart]);

	useEffect(() => {
		const price = calculateTotalPrice();
		setTotalPrice(price);
	}, [productData]);

	const calculateTotalPrice = () => {
		let totalPrice = 0;
		productData.forEach((product) => {
			const amount = cart[product.id];
			const productPrice = product.price * amount;
			totalPrice += productPrice;
		});
		return totalPrice;
	};

	return (
		<div className="cart-header">
			<NavLink to="/kosar">
				<Icon icon={shoppingCart} size={30} />
			{productData.length !== 0 && (
				<span className="badge total-price"> Végösszeg: {totalPrice} Ft</span>
			)}
			</NavLink>

		</div>
	);
};

export default CartHeader;
