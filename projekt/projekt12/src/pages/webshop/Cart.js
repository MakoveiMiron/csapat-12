import { useEffect, useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartUpdater from "../../utils/cartUpdater";
import { readCartProducts } from "../../services/authCrud";

const Cart = () => {
	const [cart, setCart] = useContext(CartContext);
	const [productData, setProductData] = useState([]);

	useEffect(() => {
		const fetchCartData = async () => {
			try {
				const productIds = Object.keys(cart);

				if (productIds.length === 0) return;

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

	const incrementAmount = (productId) => {
		const updatedCart = { ...cart, [productId]: cart[productId] + 1 };
		setCart(updatedCart);
	};

	const decrementAmount = (productId) => {
		if (cart[productId] > 1) {
			const updatedCart = { ...cart, [productId]: cart[productId] - 1 };
			setCart(updatedCart);
		}
	};

	const totalPrice = () => {
		let totalPrice = 0;
		productData.forEach((product) => {
			const amount = cart[product.id];
			const productPrice = product.price * amount;
			totalPrice += productPrice;
		});
		return totalPrice;
	};

	return (
		<div>
			<h2>Kosár</h2>
			<CartUpdater />
			{productData.length === 0 ? (
				<h3>Nincs termék a kosárban</h3>
			) : (
				<div>
					{productData.map((product) => (
						<div key={product.id}>
							<h3>{product.title}</h3>
							<p>Ár: {product.price * cart[product.id]} Ft</p>
							<p>Darabszám: {cart[product.id]}</p>
							<button onClick={() => incrementAmount(product.id)}>Növelés</button>
							<button onClick={() => decrementAmount(product.id)}>Csökkentés</button>
						</div>
					))}
					<p>Végösszeg: {totalPrice()} Ft</p>
				</div>
			)}
		</div>
	);
};

export default Cart;
