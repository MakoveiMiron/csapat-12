function formatData(obj) {
	return Object.entries(obj).map((item) => ({
		id: item[0],
		...item[1],
	}));
}

export default formatData;
