import { useEffect, useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartUpdater from "../../utils/cartUpdater";
import { readCartProducts } from "../../services/authCrud";
import { saveOrder } from "../../services/authCrud";
import { clearCart } from "../../services/authCrud";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
const Cart = () => {
	const [cart, setCart] = useContext(CartContext);
	const [user, setUser] = useContext(LoggedInUserContext);
	const [productData, setProductData] = useState([]);
	const [orderSent, setOrderSent] = useState(false);

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

	const sendOrder = async () => {
		try {
			await saveOrder(user.uid, cart);
			toast.success("Sikeresen elküldted a megrendelést!", {
				position: toast.POSITION.TOP_RIGHT,
			});

			await clearCart(user.uid);
			setCart({});

			setOrderSent(true);
		} catch (error) {
			console.error("Hiba a megrendelés elküldésekor:", error);
			toast.error("Hiba a megrendelés elküldésekor!", {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	return (
		<div>
			<h2>Kosár</h2>
			<CartUpdater />
			{productData.length === 0 ? (
				<h3>Nincs termék a kosárban</h3>
			) : (
				<>
					<div>
						{orderSent ? (
							((<h3>A megrendelés sikeresen elküldve!</h3>), (<Navigate to="/" />))
						) : (
							<div>
								{productData.map((product) => (
									<div key={product.id}>
										<h3>{product.title}</h3>
										<p>Ár: {product.price * cart[product.id]} Ft</p>
										<p>Darabszám: {cart[product.id]}</p>
										<button onClick={() => incrementAmount(product.id)}>+</button>
										<button onClick={() => decrementAmount(product.id)}>-</button>
									</div>
								))}
							</div>
						)}
					</div>
					<p>Végösszeg: {totalPrice()} Ft</p>
					<button onClick={sendOrder}>Megrendelés</button>
				</>
			)}
		</div>
	);
};

export default Cart;
