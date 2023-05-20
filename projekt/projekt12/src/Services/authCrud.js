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
export async function updateCart(user, productId, amount) {
	const url = `${API_URL}/vasarlok/${user.uid}/cart.json`;

	try {
		const response = await fetch(url, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ [productId]: amount }),
		});

		if (!response.ok) {
			throw new Error("Hiba a kosár frissítése közben");
		}

		return true;
	} catch (error) {
		throw new Error("Hiba a kosár frissítése közben");
	}
}
