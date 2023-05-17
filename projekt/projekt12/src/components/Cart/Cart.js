import { API_URL } from "../../Constans/firebaseConstans";
import { useEffect } from "react";
import { readUsers } from "../../Services/AuthCud";

const Cart = () => {
	const userId = "2qOcQRARk9PyHRzll7O72ADz8df1";

	useEffect(() => {
		readUsers(`vasarlok/${userId}`).then((data) => console.log(data));
	}, []);

	return;
};

export default Cart;
