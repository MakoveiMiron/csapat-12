import "./ProductCard.css"

export default function ProductCard(props) {
	return (
		<div className="product-row">
			<div>
				<img src="https://picsum.photos/100/100" alt="image" className="image"/>
			</div>
			<div className="product-content">
				<h1 className="product-title">{props.product.title}</h1>

				<h3 className="product-description">{props.product.description}</h3>

				<h2 className="product-price">{props.product.price + " Ft"}</h2>

				<button className="chart-button">Kosárba</button>
			</div>
		</div>
	);
}
