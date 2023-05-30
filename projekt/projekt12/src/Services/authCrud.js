import { API_URL } from "../constans/firebaseConstans";

export async function readUsers(url, id) {
	if (!id) id = "";
	try {
		const res = await fetch(`${API_URL}${url}/${id}.json`);
		if (!res.ok) {
			throw Error("Sikertelen betöltés! ");
		}
		return await res.json();
	} catch (error) {
		throw Error("Sikertelen betöltés! ");
	}
}

export async function createUsersCart(url, productId, amount) {
	try {
		const response = await fetch(`${url}/${productId}.json`);
		if (!response.ok) {
			throw new Error("Nem sikerült létrehozni!");
		}
		const data = await response.json();
		const currentValue = data ? data : 0;
		const updatedValue = currentValue + amount;

		await fetch(`${url}.json`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ [productId]: updatedValue }),
		});
	} catch (error) {
		throw new Error("Nem sikerült létrehozni!");
	}
}
export async function updateCart(user, cart) {
	const userId = user.uid;
	const url = `${API_URL}vasarlok/${userId}/cart.json`;

	try {
		const response = await fetch(url, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cart),
		});

		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(responseData.error.message);
			error.response = response;
			throw error;
		}

		return responseData;
	} catch (error) {
		throw new Error("Hiba a kosár frissítése közben: " + error.message);
	}
}

const getUserCart = (userId, setCart) => {
	return fetch(`${API_URL}vasarlok/${userId}/cart.json`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Hiba a kosár lekérésekor");
			}
			return response.json();
		})
		.then((cartData) => {
			setCart(cartData);
			return cartData;
		})
		.catch((error) => {
			console.error("Hiba a kosár lekérésekor:", error);
			throw error;
		});
};
export default getUserCart;

export function readCartProducts() {
	return fetch(`${API_URL}termekek.json`)
		.then((resp) => {
			if (!resp.ok) {
				throw new Error("Hiba a termékek lekérdezése során.");
			}
			return resp.json();
		})
		.then((data) => {
			return Object.values(data);
		})
		.catch((err) => {
			console.log(err.message);
		});
}

export const saveOrder = async (uid, products) => {
	try {
		// Megrendelés létrehozása a Firebasen
		const response = await fetch(`${API_URL}/orders.json`, {
			method: "POST",
			body: JSON.stringify({
				uid: uid,
				products: products,
			}),
		});

		if (!response.ok) {
			throw new Error("Hiba a megrendelés mentésekor.");
		}

		const data = await response.json();
		const orderId = data.name; // Az újonnan generált azonosító

		// Az objektum összeállítása a megrendeléshez
		const orderData = {
			id: orderId,
			uid: uid,
			products: products,
		};

		// Az adatok frissítése a megrendelésben
		const putResponse = await fetch(`${API_URL}/orders/${orderId}.json`, {
			method: "PUT",
			body: JSON.stringify(orderData),
		});

		if (!putResponse.ok) {
			throw new Error("Hiba a megrendelés frissítésekor.");
		}

		return { success: true };
	} catch (error) {
		return { success: false, error: error.message };
	}
};
export async function clearCart(uid, productId = null) {
	try {
		let url = `${API_URL}vasarlok/${uid}/cart.json`;
		if (productId) {
			url = `${API_URL}vasarlok/${uid}/cart/${productId}.json`;
		}

		const response = await fetch(url, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Hiba a kosár ürítésekor.");
		}

		return { success: true };
	} catch (error) {
		return { success: false, error: error.message };
	}
}

export async function deleteOrder(orderId) {
	try {
		const response = await fetch(`${API_URL}orders/${orderId}.json`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Hiba a rendelés törlésekor!");
		}

		return { success: true };
	} catch (error) {
		return { success: false, error: error.message };
	}
}
