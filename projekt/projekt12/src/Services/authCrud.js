import { API_URL } from "../constans/firebaseConstans";

export async function readUsers(url,id) {
	if(!id)id=""
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

		await fetch(`${url}/${productId}.json`)
		.then(data => data.json())
		.then(resp => {
			console.log("resp: ",resp);
			const currentValue = resp;
			const updatedValue = currentValue + amount;

			fetch(`${url}.json`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({[productId]:updatedValue}),
			});
		});
	} catch (error) {
		throw Error("Nem sikerült létrehozni! ");
	}
}
