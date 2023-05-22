export function fromAtoZ(products) {
	let sortedProducts = [...products];
	return sortedProducts.sort((a, b) => {
		if (a.title < b.title) {
			return -1;
		}
		if (a.title > b.title) {
			return 1;
		}

		return 0;
	});
}


export function fromZtoA(products) {
	let sortedProducts = [...products];
	return sortedProducts.sort((a, b) => {
		if (a.title > b.title) {
			return -1;
		}
		if (a.title < b.title) {
			return 1;
		}

		return 0;
	});
}
export function fromLowToHigh(products) {
	return [...products].sort((a, b) => a.price - b.price);
}

export function fromHighToLow(products) {
	return [...products].sort((a, b) => b.price - a.price);
}


