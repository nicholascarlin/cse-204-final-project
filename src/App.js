import { useEffect, useState } from 'react';

import CommonCurrency from './components/ui/CommonCurrency';
import { CurrencyList } from './components/utils/CurrencyList';
import CurrencySelectorDropdown from './components/ui/CurrencySelectorDropdown';
import CurrencySwapQuantityInput from './components/ui/CurrencySwapQuantityInput';
import { GetConversionRate } from './components/data/APICalls';
import { IoMdSwap } from 'react-icons/io';

function App() {
	const [activeCurrency1, setActiveCurrency1] = useState(CurrencyList[0]);
	const [activeCurrencyQuant1, setActiveCurrencyQuant1] = useState(0);

	const [activeCurrency2, setActiveCurrency2] = useState(CurrencyList[0]);
	const [activeCurrencyQuant2, setActiveCurrencyQuant2] = useState(0);

	const [c1, setC1] = useState(null);
	const [c2, setC2] = useState(null);

	const SetConversionRate = async () => {
		if (activeCurrency1 && activeCurrency2) {
			let tempConv = await GetConversionRate(activeCurrency1, activeCurrency2);
			return tempConv;
		}
		return;
	};

	const SwapCurrencies = () => {
		let tempCurrency = activeCurrency1;
		setActiveCurrency1(activeCurrency2);
		setActiveCurrency2(tempCurrency);
	};

	useEffect(() => {
		HandleCurrency1Change();
	}, [activeCurrency1, activeCurrency2]);

	const HandleCurrency1Change = async () => {
		let conv = await SetConversionRate();
		setC1(activeCurrencyQuant1);
		setC2(activeCurrencyQuant1 * conv);
	};

	const HandleCurrency2Change = async () => {
		let conv = await SetConversionRate();
		setC2(activeCurrencyQuant2);
		setC1(activeCurrencyQuant2 / conv);
	};

	useEffect(() => {
		HandleCurrency1Change();
	}, [activeCurrencyQuant1]);

	useEffect(() => {
		HandleCurrency2Change();
	}, [activeCurrencyQuant2]);

	return (
		<div className='w-screen h-screen p-8 min-w-[calc(700px)] font-serif'>
			<div className='w-full bg-blue-500 p-4 mb-16 rounded-xl shadow-xl'>
				<h1 className='text-4xl font-semibold text-white'>
					Currency Converter
				</h1>
				<p className='mt-2 ml-1 text-gray-200 font-thin'>
					Choose your selected currencies and get <strong>daily updated</strong>{' '}
					conversion rates!
				</p>
			</div>

			<div className='bg-white shadow-2xl border p-6 pb-8 rounded-xl w-2/3 mx-auto'>
				<h3 className='text-2xl mb-4'>Compare Currencies of Your Choice</h3>
				<div className='flex flex-col space-y-4 xl:space-y-0 xl:flex-row items-center justify-around'>
					<div className='flex flex-col'>
						<CurrencySelectorDropdown
							setActiveCurrency={setActiveCurrency1}
							Val={activeCurrency1}
						/>
						<CurrencySwapQuantityInput
							setActiveCurrencyQuant={setActiveCurrencyQuant1}
							Val={c1}
							Symbol={activeCurrency1.symbol}
						/>
					</div>
					<IoMdSwap
						onClick={() => {
							SwapCurrencies();
						}}
						className='text-3xl rotate-90 xl:rotate-0 cursor-pointer hover:text-4xl transition-all duration-300 hover:text-blue-500'
					/>
					<div className='flex flex-col'>
						<CurrencySelectorDropdown
							setActiveCurrency={setActiveCurrency2}
							Val={activeCurrency2}
						/>
						<CurrencySwapQuantityInput
							setActiveCurrencyQuant={setActiveCurrencyQuant2}
							Val={c2}
							Symbol={activeCurrency2.symbol}
						/>
					</div>
				</div>
			</div>

			<hr className='mt-20' />

			<div className='mt-8 p-8'>
				<h2 className='text-3xl'>Common Conversions</h2>
				<div className='w-2/3 flex flex-col space-y-2 xl:space-y-0 xl:flex-row items-center justify-evenly mx-auto mt-16'>
					<CommonCurrency
						CurrencyCode={'USD'}
						CountryName={'USA'}
						C1={c1}
						Currency1={activeCurrency1}
					/>
					<CommonCurrency
						CurrencyCode={'EUR'}
						CountryName={'EU'}
						C1={c1}
						Currency1={activeCurrency1}
					/>
					<CommonCurrency
						CurrencyCode={'GBP'}
						CountryName={'UK'}
						C1={c1}
						Currency1={activeCurrency1}
					/>
					<CommonCurrency
						CurrencyCode={'JPY'}
						CountryName={'Japan '}
						C1={c1}
						Currency1={activeCurrency1}
					/>
					<CommonCurrency
						CurrencyCode={'AUD'}
						CountryName={'Australia'}
						C1={c1}
						Currency1={activeCurrency1}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
