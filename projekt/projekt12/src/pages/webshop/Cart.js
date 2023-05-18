import { API_URL } from "../../constans/firebaseConstans";
import { useEffect, useContext, useState } from "react";
import { readUsers } from "../../services/authCrud";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { Navigate } from "react-router-dom";
import { readProducts } from "../../services/Crud";
import formatData from "../../utils/formdata";
const Cart = (props) => {
	const [user,setUser] = useContext(LoggedInUserContext);
	const [productsInCart, setProductsInCart] = useState([]);
	const [productList,setProductList] = useState([]);

	useEffect(()=> {
		readProducts()
		.then(resp => {
			setProductList(formatData((resp)))
			readUsers(`vasarlok/${user.uid}/cart`)
			.then(resp => {
				setProductsInCart((resp))	
			});
		})
	},[])

	if(!productsInCart)return <h2>nincs termek a kosarban</h2>
	

	return (
		<>
			<ul>
				
				{Object.entries(productsInCart).map((data) => (
					<>
						<li key={`${data[0]}title`}>
							{productList.find((product) => product.id === data[0]).title}
							Ár: {productList.find((product) => product.id === data[0]).price} Ft
							Mennyiség: {data[1]}
						</li>
						{/* <li key={`${data[0]}price`}>
							Ár: {productList.find((product) => product.id === data[0]).price} Ft
						</li>
						<li>Mennyiség: {data[1]} </li> */}
					</>
				))}
			</ul>
		</>
	);
};

export default Cart;
