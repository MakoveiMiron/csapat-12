export default function cartFormatter(data) {
	if (!data) return [];

	const formattedData = Object.values(data).reduce((result, item) => {
		const existingItemIndex = result.findIndex(
			(formattedItem) => formattedItem.id === item.id
		);

		if (existingItemIndex === -1) {
			result.push({
				...item,
				cartId: item.id,
				amount: 1,
			});
		} else {
			result[existingItemIndex].amount += 1;
			result[existingItemIndex].price =
				parseFloat(result[existingItemIndex].price) + parseFloat(item.price);
		}

		return result;
	}, []);

	return formattedData;
}
