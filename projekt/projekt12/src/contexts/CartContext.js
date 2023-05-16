import { useState, useEffect, createContext } from "react";
import cartFormatter from "../Utils/cartFormatter";
import { readUsers } from "../Services/AuthCud";

export const cartContext = createContext([]);

const userId = "2qOcQRARk9PyHRzll7O72ADz8df1";

export const CartContextProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		readUsers(`vasarlok/${userId}/cart`).then((data) =>
			setCart(cartFormatter(data))
		);
	}, []);
	console.log(cart);
	return (
		<cartContext.Provider value={{ cart, setCart }}>
			{children}
		</cartContext.Provider>
	);
};
