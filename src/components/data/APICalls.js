export const GetConversionRate = async (currency1, currency2) => {
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
