export default function ProductCard(props) {
	return (
		<div className="product-row">
			<img src="https://picsum.photos/100/100" alt="image"/>
			<h3 className="product-title">{props.product.title}</h3>

			<p className="product-description">{props.product.description}</p>

			<p className="product-price">{props.product.price + " Ft"}</p>

			<button>Kosárba</button>
		</div>
	);
}
