export function orderfromAtoZ(products) {
	let sortedProducts = [...products];
	return sortedProducts.sort((a, b) => {
		if (a.id < b.id) {
			return -1;
		}
		if (a.id > b.id) {
			return 1;
		}

		return 0;
	});
}


export function orderfromZtoA(products) {
	let sortedProducts =  [...products];
	return sortedProducts.sort((a, b) => {
		if (a.id > b.id) {
			return -1;
		}
		if (a.id < b.id) {
			return 1;
		}

		return 0;
	});
}