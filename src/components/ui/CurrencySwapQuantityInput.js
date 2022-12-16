import React from 'react';

const CurrencySwapQuantityInput = ({ setActiveCurrencyQuant, Val }) => {
	return (
		<div className='mt-2'>
			<input
				value={Val}
				onChange={(e) => {
					setActiveCurrencyQuant(e.target.value);
				}}
				type='number'
				className='py-4 border-b border-b-gray-500 bg-gray-100 w-full px-2 focus:outline-none focus:border-blue-500 transition-all duration-300'
			/>
		</div>
	);
};

export default CurrencySwapQuantityInput;
