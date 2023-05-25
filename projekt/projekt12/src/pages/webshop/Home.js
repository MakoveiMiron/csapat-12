import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import ProductCard from "../../components/webshop/productCard/ProductCard";
import { readProducts } from "../../services/Crud";
export default function Home() {
	const [featuredProducts, setFeaturedProducts] = useState([]);

	useEffect(() => {
		readProducts().then((products) => {
			const featuredProductList = Object.values(products).slice(0, 3);
			setFeaturedProducts(featuredProductList);
		});
	}, []);

	return (
		<main className="main">
			<div className="about">
				<p className="home-intro">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe mollitia
					laborum quidem sunt accusamus totam, maxime provident reprehenderit enim
					repudiandae eius corporis voluptatum temporibus non explicabo tenetur rem
					quo quos? .{" "}
				</p>
			</div>
			<div className="top-products">
				<h2>Kiemelt termékek</h2>
				<div className="product-box">
					{featuredProducts.map((p) => (
						<ProductCard key={p.id} id={p.id} product={p} />
					))}
				</div>
			</div>

		</main>
	);
}
