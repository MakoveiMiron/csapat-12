export default function cartFormatter(cartData, productId) {
	if (!cartData) return [];
	
	const formattedData = Object.values(cartData).reduce((result, item) => {
		
		const existingItemIndex = result.findIndex(
			(formattedItem) => formattedItem.id === item.id 
		);
			
		if (existingItemIndex === -1) {
			
			result.push({
				...cartData,
				[productId]:1
			});
			
		} else {
			
			result[existingItemIndex].amount += 1;
			result[existingItemIndex].price =
				parseFloat(result[existingItemIndex].price) + parseFloat(item.price);
		}

		return result;
	},[]);
	

	return formattedData;
}
