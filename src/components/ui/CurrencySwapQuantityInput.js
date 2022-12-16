import React from 'react';

const CurrencySwapQuantityInput = ({ setActiveCurrencyQuant, Val, Symbol }) => {
	return (
		<div className='mt-2 relative'>
			<input
				value={Val}
				onChange={(e) => {
					setActiveCurrencyQuant(e.target.value);
				}}
				type='number'
				className='appearance-none py-4 border-b border-b-gray-500 bg-gray-100 w-full px-2 pr-16 focus:outline-none focus:border-blue-500 transition-all duration-300'
			/>
			<div className='absolute right-2 top-4 text-gray-500'>{Symbol}</div>
		</div>
	);
};

export default CurrencySwapQuantityInput;
