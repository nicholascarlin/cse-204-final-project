export const GetAllAvailableCurrencies = async () => {
	console.log('CALLED');
	fetch(
		'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json'
	).then((resp) => {
		console.log('IN', resp);
	});
};
