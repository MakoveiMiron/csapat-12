export default function ProductCard(props) {
	return (
		<div className="product-row">
			<span className="product-title">{props.product.title}</span>

			<span className="product-price">{props.product.price}</span>

			<span className="product-description">{props.product.description}</span>
		</div>
	);
}
