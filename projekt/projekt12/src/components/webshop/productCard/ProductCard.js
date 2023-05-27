import "./ProductCard.css";
import { useContext, useState, useEffect } from "react";
import { createUsersCart } from "../../../services/authCrud";
import { CartContext } from "../../../contexts/CartContext";
import getUserCart from "../../../services/authCrud";
import { toast } from "react-toastify";
import { API_URL } from "../../../constans/firebaseConstans";
import { LoggedInUserContext } from "../../../contexts/LoggedInUserContext";
import { getOrderIds } from "../../../services/Crud";
import { FiCheck } from "react-icons/fi";

export default function ProductCard(props) {
	const [cart, setCart] = useContext(CartContext);
	const [amount, setAmount] = useState(1);
	const [user, setUser] = useContext(LoggedInUserContext);
	const [orders, setOrders] = useState([]);
	const [isButtonClicked, setButton] = useState(false)
	const [isProductInCart, setIsProductInCart] = useState(false)

	useEffect(() => {
        getOrderIds()
        .then(resp =>{
            setOrders(resp)
        });
    },[orders]);

	useEffect(() => {
		checkIfProductInCart()
	},[cart,props.currentPage]);

	function checkIfProductInCart(){
		if(cart === null){
			return
		}
		else{
			Object.keys(cart).map(productId => {
				if(productId === props.id){
					setIsProductInCart(true);
				}
			})
		}
	}
	const addToCart = (e) => {
		if (user) {
			const productId = e.target.name;
			const updatedAmount = amount;
			setButton(true);
			createUsersCart(
				`${API_URL}vasarlok/${user.uid}/cart`,
				productId,
				updatedAmount
			)
				.then(() => getUserCart(user.uid, setCart))
				.then(() => {
					toast.success("Sikeresen a kosárhoz adtad!", {
						position: toast.POSITION.BOTTOM_RIGHT,
					});
				})
				.catch((error) => {
					console.error("Hiba a kosárhoz adás közben:", error);
					toast.error("Hiba a kosárhoz adás közben", {
						position: toast.POSITION.BOTTOM_RIGHT,
					});
				});
		} else {
			toast.error("Előbb jelentkezz be!", {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	};
	return (
		<div className="product-row">
		
				<img src={props.product.url} alt="image" className="image" />
			
			<div className="product-content">
				<h1 className="product-title">{props.product.title}</h1>

				{/* <h3 className="product-description">{props.product.description}</h3> */}

				<h2 className="product-price">{props.product.price + " Ft"}</h2>

				{isButtonClicked || isProductInCart ? (
        			<>
					<p>Ez a termék már a kosaradban van!</p>
					<FiCheck />
					</>
      			) : (
        			<button 
						className="chart-button" 
						name={props.product.id} 
						onClick={addToCart}
					>
         				 Kosárba
        			</button>
      				)}
			</div>
		</div>
	);
}
