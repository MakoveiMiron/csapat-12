import React from "react";
const CartItem = ({
	product,
	cartItemAmount,
	incrementAmount,
	decrementAmount,
}) => {
	const handleIncrement = () => {
		incrementAmount(product.id);
	};

	const handleDecrement = () => {
		decrementAmount(product.id);
	};

	return (
		<div className="grid-container">
			<div className="grid-item">
				<h3>{product.title}</h3>
				<p>Ár: {product.price * cartItemAmount} Ft</p>
				<p>Darabszám: {cartItemAmount}</p>
			</div>
			<div className="grid-item">
				<button onClick={handleIncrement}>+</button>
				<button onClick={handleDecrement}>-</button>
			</div>
		</div>
	);
};

export default CartItem;
