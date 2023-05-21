import { CartContext } from "../contexts/CartContext";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";
import { updateCart } from "../services/authCrud";
import { useContext, useEffect } from "react";

const CartUpdater = () => {
	const [cart, setCart] = useContext(CartContext);
	const [user] = useContext(LoggedInUserContext);

	useEffect(() => {
		const updateCartData = async () => {
			try {
				await updateCart(user, cart);
				console.log("Kosár frissítve a Firebase adatbázisban");
			} catch (error) {
				console.error("Hiba a kosár frissítésekor a Firebase adatbázisban:", error);
			}
		};

		updateCartData();
	}, [cart, user]);

	return null;
};

export default CartUpdater;
