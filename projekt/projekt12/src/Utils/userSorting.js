export function customersfromAtoZ(customers) {
	let sortedCustomers = [...customers];
	return sortedCustomers.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}

		return 0;
	});
}

export function customersfromZtoA(customers) {
	let sortedCustomers = [...customers];
	return sortedCustomers.sort((a, b) => {
		if (a.name > b.name) {
			return -1;
		}
		if (a.name < b.name) {
			return 1;
		}

		return 0;
	});
}
