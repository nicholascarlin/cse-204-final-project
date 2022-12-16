import { GetCommonConversionRate, GetConversionRate } from '../data/APICalls';
import React, { useEffect, useState } from 'react';

import { getEmojiByCurrencyCode } from 'country-currency-emoji-flags';

const CommonCurrency = ({ CurrencyCode, CountryName, C1, Currency1 }) => {
	const [convRate, setConvRate] = useState(0);

	useEffect(() => {
		console.log('Called', Currency1);
		HandleConvRate();
	}, Currency1);

	const HandleConvRate = async () => {
		console.log('currency1', Currency1);
		console.log('CC', CurrencyCode);
		let tempConv = await GetCommonConversionRate(Currency1, CurrencyCode);
		console.log('TCX', tempConv);
		setConvRate(tempConv);
	};

	return (
		<div className='bg-white p-6 rounded-xl shadow-xl flex flex-col items-center border space-y-2 w-40'>
			<div className='text-6xl'>{getEmojiByCurrencyCode(CurrencyCode)}</div>
			<div className='font-semibold'>{CountryName}</div>
			<div className='text-3xl truncate w-full text-center'>
				{(C1 * convRate).toFixed(2) || 0}
			</div>
		</div>
	);
};

export default CommonCurrency;
