import { CurrencyList } from '../utils/CurrencyList';
import React from 'react';
import { RxCaretDown } from 'react-icons/rx';
import { getEmojiByCurrencyCode } from 'country-currency-emoji-flags';

const CurrencySelectorDropdown = ({ setActiveCurrency }) => {
	const HandleChange = (e) => {
		let currencyObj = CurrencyList.find((currency) => {
			return currency.code === e.target.value;
		});
		setActiveCurrency(currencyObj);
	};

	return (
		<div className='relative'>
			<select
				onChange={(e) => {
					HandleChange(e);
				}}
				className='focus:outline-none p-4 border pl-4 pr-12 appearance-none'>
				{CurrencyList.map((item, idx) => {
					return (
						<option key={idx} value={item.code}>
							{getEmojiByCurrencyCode(item.code)} {item.name}
						</option>
					);
				})}
			</select>
			<RxCaretDown className='text-3xl absolute right-2 top-0 bottom-0 my-auto' />
		</div>
	);
};

export default CurrencySelectorDropdown;
