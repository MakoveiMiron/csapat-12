import React from "react";
import "./Cart.css";
import { IoTrashBinOutline } from "react-icons/io5";

const CartItem = ({
	product,
	cartItemAmount,
	incrementAmount,
	decrementAmount,
	removeItem,
}) => {
	const handleIncrement = () => {
		incrementAmount(product.id);
	};

	const handleDecrement = () => {
		decrementAmount(product.id);
	};

	const handleRemove = () => {
		removeItem(product.id);
	};

	return (
		<div className="cart-row">
			<div className="product-details">
				<img src={product.url} alt={product.id} />
				<p>{product.title}</p>
				<p>{product.category}</p>
			</div>
			<div className="price">Ár: {product.price * cartItemAmount} Ft</div>

			<div className="amount">
				<button className="decrement" onClick={handleDecrement}>
					-
				</button>
				{cartItemAmount}
				<button className="increment" onClick={handleIncrement}>
					+
				</button>
			</div>
			<div className="remove">
				<button onClick={handleRemove}>
					<IoTrashBinOutline />
				</button>
			</div>
		</div>
	);
};

export default CartItem;
