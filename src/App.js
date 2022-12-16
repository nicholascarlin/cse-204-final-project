import { useEffect, useState } from 'react';

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

	const [conversionRate, setConversionRate] = useState(1);

	const [c1, setC1] = useState(null);
	const [c2, setC2] = useState(null);

	const SetConversionRate = async () => {
		if (activeCurrency1 && activeCurrency2) {
			console.log('Get1', activeCurrency1);
			let tempConv = await GetConversionRate(activeCurrency1, activeCurrency2);
			setConversionRate(tempConv);
			return tempConv;
		}
		return;
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
		<div className='w-screen h-screen p-8 min-w-[calc(700px)]'>
			<h1 className='text-4xl font-semibold pb-8'>Currency Hub</h1>

			<div className='bg-white shadow-2xl border p-4 rounded-xl w-2/3 mx-auto'>
				<h3 className='text-2xl mb-4'>Compare Currencies of Your Choice</h3>
				<div className='flex flex-col space-y-4 xl:space-y-0 xl:flex-row items-center justify-around'>
					<div className='flex flex-col'>
						<CurrencySelectorDropdown setActiveCurrency={setActiveCurrency1} />
						<CurrencySwapQuantityInput
							setActiveCurrencyQuant={setActiveCurrencyQuant1}
							Val={c1}
						/>
					</div>
					<IoMdSwap className='text-3xl rotate-90 xl:rotate-0' />
					<div className='flex flex-col'>
						<CurrencySelectorDropdown setActiveCurrency={setActiveCurrency2} />
						<CurrencySwapQuantityInput
							setActiveCurrencyQuant={setActiveCurrencyQuant2}
							Val={c2}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
