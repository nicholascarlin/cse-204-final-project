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
			let tempConv = await GetConversionRate(activeCurrency1, activeCurrency2);
			setConversionRate(tempConv);
		}
	};

	useEffect(() => {
		SetConversionRate();
	}, [activeCurrency1, activeCurrency2]);

	const HandleCurrency1Change = async () => {
		SetConversionRate().then(() => {
			console.log('IN THEN');
			setC1(activeCurrencyQuant1);
			setC2(activeCurrencyQuant1 * conversionRate);
		});
	};

	const HandleCurrency2Change = async () => {
		SetConversionRate().then(() => {
			setC2(activeCurrencyQuant2);
			setC1(activeCurrencyQuant2 / conversionRate);
		});
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
						<CurrencySelectorDropdown
							setActiveCurrency={setActiveCurrency1}
							activeCurrency={activeCurrency1}
						/>
						<CurrencySwapQuantityInput
							setActiveCurrencyQuant={setActiveCurrencyQuant1}
						/>
					</div>
					<IoMdSwap className='text-3xl rotate-90 xl:rotate-0' />
					<div className='flex flex-col'>
						<CurrencySelectorDropdown
							setActiveCurrency={setActiveCurrency2}
							activeCurrency={activeCurrency2}
						/>
						<CurrencySwapQuantityInput
							setActiveCurrencyQuant={setActiveCurrencyQuant2}
						/>
					</div>
				</div>
				<div className='w-full flex flex-col justify-center my-6 mb-4'>
					<div>{c1 || 'NA'}</div>
					<div>{c2 || 'NA'}</div>
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
