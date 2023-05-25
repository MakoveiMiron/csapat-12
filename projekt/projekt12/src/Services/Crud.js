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

export function createProduct(price, title, description, categoryId, url) {
	const productData = {
		title: title,
		price: price,
		description: description,
		categoryId: categoryId,
		url: url,
	};

	return fetch(`${API_URL}termekek.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(productData),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Hiba az új termék létrehozása során.");
			}
			return response.json();
		})
		.then((data) => {
			const productId = data.name;
			return fetch(`${API_URL}termekek/${productId}.json`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: productId,
					categoryId: categoryId,
					url: url,
				}),
			});
		})
		.catch((error) => {
			console.log(error.message);
		});
}
console.log("sasy");
export function updateProduct(id, title, price, description, categoryId) {
	return fetch(`${API_URL}termekek/${id}.json`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title, price, description, categoryId }),
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

export function uploadImg(url, id) {
	return fetch(`${API_URL}termekek/${id}.json`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ url }),
	}).then((data) => {
		if (!data.ok) {
			throw new Error("Hiba a termék frissítése során.");
		}
		return data.json();
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

export function getOrderIds() {
	return fetch(`${API_URL}orders.json`).then((data) => data.json());
}

export function createCategory(name) {
	return fetch(`${API_URL}category.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name }),
	})
		.then((data) => {
			if (!data.ok) {
				throw new Error("Hiba az új termék létrehozása során.");
			}
			return data.json();
		})
		.then((resp) => setCategoryId(resp.name))
		.catch((err) => {
			console.log(err.message);
		});
}

function setCategoryId(id) {
	fetch(`${API_URL}category/${id}.json`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: id }),
	});
}



export function getCategoryList() {
    return fetch(`${API_URL}category.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Hiba a kategórialista lekérésekor");
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Hiba a kategórialista lekérésekor:", error);
            throw error;
        });
};




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
