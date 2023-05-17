import { API_URL } from "../constans/firebaseConstans";

export async function readUsers(url) {
	try {
		const res = await fetch(`${API_URL}${url}.json`);
		if (!res.ok) {
			throw Error("Sikertelen betöltés! ");
		}
		return await res.json();
	} catch (error) {
		throw Error("Sikertelen betöltés! ");
	}
}

export async function createUsersCart(url, formData) {
	try {
		const res = await fetch(`${API_URL}${url}.json`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (!res.ok) {
			throw Error("Nem sikerült létrehozni! ");
		}
		return await res.json();
	} catch (error) {
		throw Error("Nem sikerült létrehozni! ");
	}
}
