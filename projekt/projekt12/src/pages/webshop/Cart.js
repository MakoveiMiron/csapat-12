import { API_URL } from "../../constans/firebaseConstans";
import { useEffect, useContext, useState } from "react";
import { readUsers } from "../../services/authCrud";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { Navigate } from "react-router-dom";
import { readProducts } from "../../services/Crud";
import formatData from "../../utils/formdata";
import { updateCart } from "../../services/authCrud";

const Cart = () => {
	const [user, setUser] = useContext(LoggedInUserContext);
	const [productsInCart, setProductsInCart] = useState([]);
	const [productList, setProductList] = useState([]);
	const [amounts, setAmounts] = useState({});

	useEffect(() => {
		readProducts().then((resp) => {
			setProductList(formatData(resp));
			readUsers(`vasarlok/${user.uid}/cart`).then((resp) => {
				setProductsInCart(resp);
				setAmounts(getInitialAmounts(resp));
			});
		});
	}, []);

	if (!productsInCart) return <h2>nincs termék a kosárban</h2>;

	const getInitialAmounts = (cart) => {
		const initialAmounts = {};
		Object.keys(cart).forEach((productId) => {
			initialAmounts[productId] = 1;
		});
		console.log(initialAmounts);
		return initialAmounts;
	};

	const increaseAmount = (productId) => {
		setAmounts((prevAmounts) => ({
			...prevAmounts,
			[productId]: prevAmounts[productId] + 1,
		}));
		updateCart(user, productId, amounts[productId]);
	};

	const decreaseAmount = (productId) => {
		setAmounts((prevAmounts) => ({
			...prevAmounts,
			[productId]: prevAmounts[productId] - 1,
		}));
		console.log(productId);
		// updateCart(user, productId, amounts[productId]);
	};

	return (
		<>
			<ul>
				{Object.entries(productsInCart).map((data) => {
					const productId = data[0];
					const product = productList.find((product) => product.id === productId);
					if (!product) return null;
					return (
						<li key={`${productId}title`}>
							{product.title} Ár: {product.price * amounts[productId]} Ft Mennyiség:{" "}
							{amounts[productId]}
							{amounts[productId] === 0 ? null : (
								<>
									<button
										disabled={amounts[productId] === 1}
										onClick={() => decreaseAmount(productId)}
									>
										-
									</button>
									<p>{amounts[productId]}</p>
								</>
							)}
							<button onClick={() => increaseAmount(productId)}>+</button>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default Cart;
