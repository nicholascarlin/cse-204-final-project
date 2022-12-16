import { CurrencyList } from './components/utils/CurrencyList';
import CurrencySelectorDropdown from './components/ui/CurrencySelectorDropdown';
import CurrencySwapQuantityInput from './components/ui/CurrencySwapQuantityInput';
import { GetAllAvailableCurrencies } from './components/data/APICalls';
import { IoMdSwap } from 'react-icons/io';
import { RxCaretDown } from 'react-icons/rx';
import { getEmojiByCurrencyCode } from 'country-currency-emoji-flags';
import { useState } from 'react';

function App() {
	const [activeCurrency1, setActiveCurrency1] = useState(null);
	const [activeCurrency2, setActiveCurrency2] = useState(null);

	return (
		<div className='w-screen h-screen p-8 min-w-[calc(700px)]'>
			<h1 className='text-4xl font-semibold pb-8'>Currency Hub</h1>

			<div className='bg-white shadow-2xl border p-4 rounded-xl w-2/3 mx-auto'>
				<h3 className='text-2xl mb-4'>Compare Currencies of Your Choice</h3>
				<div className='flex flex-col space-y-4 xl:space-y-0 xl:flex-row items-center justify-around'>
					<div className='flex flex-col'>
						<CurrencySelectorDropdown
							setActiveCurrency={setActiveCurrency1}
							activeCurrency={activeCurrency1}
						/>
						<CurrencySwapQuantityInput />
					</div>
					<IoMdSwap className='text-3xl hidden xl:block' />
					<div className='flex flex-col'>
						<CurrencySelectorDropdown
							setActiveCurrency={setActiveCurrency2}
							activeCurrency={activeCurrency2}
						/>
						<CurrencySwapQuantityInput />
					</div>
				</div>
			</div>
			{/* <div>
				{CurrencyList.map((item, idx) => {
					return (
						<div className='flex space-x-2' key={idx}>
							<div>{item.name}</div>
							<div>{item.code}</div>
							<div>{getEmojiByCurrencyCode(item.code) || 'NULL'}</div>
							<div>{item.symbol}</div>
						</div>
					);
				})}
			</div> */}
		</div>
	);
}

export default App;
