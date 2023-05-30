import { useEffect, useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartUpdater from "../../utils/cartUpdater";
import { readCartProducts } from "../../services/authCrud";
import { saveOrder } from "../../services/authCrud";
import { clearCart } from "../../services/authCrud";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartItem from "./CartItem";
import "./Cart.css";

const Cart = () => {
	const [cart, setCart] = useContext(CartContext);
	const [user, setUser] = useContext(LoggedInUserContext);
	const [productData, setProductData] = useState([]);
	const [orderSent, setOrderSent] = useState(false);
	const [emptyCart, setEmptyCart] = useState(false);

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

	const removeItem = (productId) => {
		const updatedCart = { ...cart };
		delete updatedCart[productId];
		setCart(updatedCart);
		clearCart(user.uid, productId); // Új sor: a termék törlése a backenden
	};
	const removeCart = async () => {
		try {
			await clearCart(user.uid);
			setCart({});
			setEmptyCart(true);

			toast.success("Sikeresen törölted a kosarad!", {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			console.error("Hiba a kosár törlésekor:", error);
			toast.error("Hiba a kosár törlésekor!", {
				position: toast.POSITION.TOP_RIGHT,
			});
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
		<section className="grid-container">
			<div className="cart-container">
				<CartUpdater />
				{productData.length === 0 ? (
					<h3>Nincs termék a kosárban</h3>
				) : (
					<>
						<div className="wrap">
							{orderSent || emptyCart ? (
								<>
									<h3>A megrendelés sikeresen elküldve!</h3>
									<Navigate to="/" />
								</>
							) : (
								<div className="container">
									<div className="cart-row-head">
										<div className="product">Termék</div>
										<div className="price">Ár</div>
										<div className="amount">Mennyiség</div>
										<div className="remove">Eltávolít</div>
									</div>

									{productData.map((product) => (
										<CartItem
											key={product.id}
											product={product}
											cartItemAmount={cart[product.id]}
											incrementAmount={incrementAmount}
											decrementAmount={decrementAmount}
											removeItem={removeItem}
										/>
									))}

									<div className="row total">
										<div className="price">Végösszeg: {totalPrice()} Ft</div>
									</div>
									<div className="row checkout">
										<button onClick={sendOrder}>Megrendelés</button>
										<button onClick={removeCart}>kosár törlése</button>
									</div>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default Cart;
