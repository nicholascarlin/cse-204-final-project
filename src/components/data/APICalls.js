export const GetAllAvailableCurrencies = async () => {
	fetch(
		'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json'
	).then((resp) => {
		console.log('IN', resp);
	});
};

export const GetConversionRate = async (currency1, currency2) => {
	console.log('Currency1', currency1.code);
	console.log('Currency2', currency2.code);
	if (currency1 && currency2) {
		const response = await fetch(
			`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1.code
				.toString()
				.toLowerCase()}/${currency2.code.toString().toLowerCase()}.json`
		);
		const data = await response.json();
		return data[currency2.code.toLowerCase()];
	}
};
