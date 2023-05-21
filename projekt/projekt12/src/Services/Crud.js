import { API_URL } from "../constans/firebaseConstans";

export function readProducts() {
	return fetch(`${API_URL}termekek.json`)
		.then((resp) => {
			if (!resp.ok) {
				throw new Error("Hiba a termékek lekérdezése során.");
			}
			return resp.json();
		})
		.catch((err) => {
			console.log(err.message);
		});
}

export function createProduct(price, title, description) {
	return fetch(`${API_URL}termekek.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title, price, description }),
	})
		.then((data) => {
			if (!data.ok) {
				throw new Error("Hiba az új termék létrehozása során.");
			}
			return data.json();
		})
		.then((resp) =>
			fetch(`${API_URL}termekek/${resp.name}.json`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: resp.name }),
			})
		)
		.catch((err) => {
			console.log(err.message);
		});
}

export function updateProduct(id, title, price, description) {
	return fetch(`${API_URL}termekek/${id}.json`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title, price, description }),
	})
		.then((data) => {
			if (!data.ok) {
				throw new Error("Hiba a termék frissítése során.");
			}
			return data.json();
		})
		.catch((err) => {
			console.log(err.message);
		});
}

export function deleteProduct(id) {
	return fetch(`${API_URL}termekek/${id}.json`, {
		method: "DELETE",
	})
		.then((data) => {
			if (!data.ok) {
				throw new Error("Hiba a termék törlése során.");
			}
			return data;
		})
		.catch((err) => {
			console.log(err.message);
		});
}

export function getOrderIds(){
	return fetch(`${API_URL}orders.json`)
	.then(data => data.json())
}

// export function deleteProduct(id) {
// 	return fetch(`${API_URL}termekek/${id}.json`, {
// 		method: "DELETE",
// 	}).then((response) => {
// 		if (!response.ok) {
// 			throw new Error("Hiba történt a termék törlése során.");
// 		}
// 		// szimulál egy hibát a folyamat során.
// 		throw new Error("Szimulált hiba a termék törlése során.");
// 	});
// }
