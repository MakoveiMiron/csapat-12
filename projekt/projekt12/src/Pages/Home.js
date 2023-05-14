import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import ProductCard from "../components/Products/ProductCard";
import { readProducts } from "../Services/Crud";
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
				<p className="intro">Bemutatkozás</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe mollitia
					laborum quidem sunt accusamus totam, maxime provident reprehenderit enim
					repudiandae eius corporis voluptatum temporibus non explicabo tenetur rem
					quo quos? Sint facere voluptates cum totam. Repellat quasi enim cum ex
					eveniet voluptates, deserunt error quo voluptate, iure molestias dicta
					voluptatum laudantium atque odio omnis corrupti! Non ratione eius maxime
					quas molestiae cum nulla et sequi minima.{" "}
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

			<div className="news">Hírek</div>
			<div className="blog">Blog</div>
		</main>
	);
}
