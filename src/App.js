import { useEffect, useState } from 'react';

import { AiOutlineDollarCircle } from 'react-icons/ai';
import CommonCurrency from './components/ui/CommonCurrency';
import { CurrencyList } from './components/utils/CurrencyList';
import CurrencySelectorDropdown from './components/ui/CurrencySelectorDropdown';
import CurrencySwapQuantityInput from './components/ui/CurrencySwapQuantityInput';
import FixedVsFloating from './components/assets/FixedVsFloating.png';
import { GetConversionRate } from './components/data/APICalls';
import { IoMdSwap } from 'react-icons/io';
import SupplyAndDemand from './components/assets/SupplyAndDemand.png';

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
		<div className='w-screen h-screen min-w-[calc(700px)] font-serif'>
			<div className='bg-blue-500 shadow-xl text-white mb-6 p-4 flex justify-between items-center'>
				<div className='font-bold'>Currency.com</div>
				<AiOutlineDollarCircle className='text-xl' />
			</div>
			<div className='w-full p-4'>
				<h1 className='text-4xl font-semibold'>Currency Converter</h1>
				<p className='mt-2 ml-1 text-gray-500 font-thin'>
					Choose your selected currencies and get <strong>daily updated</strong>{' '}
					conversion rates!
				</p>
			</div>

			<div className='bg-white shadow-2xl border p-6 pb-8 rounded-xl w-2/3 mx-auto mt-8'>
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
			{/* Content From: https://world101.cfr.org/global-era-issues/monetary-policy-and-currencies/understanding-currencies-and-exchange-rates */}
			<div className='mt-24 px-8 py-1 w-2/3 mx-auto flex flex-col'>
				<div className='flex flex-col items-center my-8'>
					<div className='font-light text-sm text-gray-500 mb-4'>
						MONETARY POLICY AND CURRENCIES
					</div>
					<div className='text-3xl font-semibold mb-4'>
						Understanding Currencies and Exchange Rates
					</div>
					<div className='text-light mb-10'>
						Supply and demand influence how much a currency is worth.
					</div>
					<div className='h-1 w-20 bg-red-500'></div>
				</div>
				<p className='mt-2'>
					Have you ever wondered why every country doesn’t just use the same
					currency? Wouldn’t life be easier if we didn’t have to waste time
					exchanging bills or calculating conversion in our heads when we
					travel? Well, the majority of countries have their own currency for a
					reason, and it’s a simple one: most countries have unique economic
					situations and want to make monetary decisions based on their specific
					interests and needs. To understand what those decisions are, it’s
					important to understand why currencies have different values and how
					these values shift over time.
				</p>
				<h2 className='text-2xl font-medium mt-8'>
					Different currencies are worth different amounts.
				</h2>
				<p className='mt-2'>
					A Snickers bar might cost you a dollar in the United States, but in
					Indonesia it could cost you over 14,000 rupiah. Does that mean a
					chocolate bar is 14,000 times as expensive in Indonesia as it is in
					the United States? Well, no—if you convert rupiah into U.S. dollars,
					it actually costs roughly the same. So who decides how much a currency
					is worth? For a handful of countries, it’s pretty straightforward:
					these countries pick a commonly used currency, usually the U.S. dollar
					or the euro, and “peg” their own currency’s exchange rate to this
					currency. For example, Belize’s central bank decided its currency
					would be worth one-half of a U.S. dollar. Such currencies are called
					fixed or pegged. Countries usually peg their currencies to maintain
					stability for investors, who don’t want to worry about fluctuations in
					the currency’s value. If a currency’s value drops, for example, the
					value of the investment would drop as well.
				</p>
				<img
					className='mx-auto my-8'
					src={FixedVsFloating}
					alt='Fixed vs Floating Currencies'
				/>
				<p>
					But most exchange rates aren’t fixed—they’re “floating,” meaning their
					values constantly change depending on various economic factors. As of
					March 2021, one U.S. dollar is the equivalent of about seventy-two
					Indian rupees. Ten years ago, a dollar was worth fifty rupees. And
					forty years ago, you only needed eight rupees to get one dollar. Over
					time, the value of the rupee has depreciated, or gone down, making it
					worth less. Sometimes a currency that depreciates is described as
					getting weaker because you can buy less foreign currency with it. On
					the flip side, the Israeli new shekel was worth just nineteen U.S.
					cents in 2003, but its value has grown over time, trading in for
					thirty cents in March 2021, a nearly 60 percent increase. Over this
					time period, the shekel got stronger or more valuable; in other words,
					the currency appreciated.
				</p>
				<em className='mt-6'>
					Appreciation = getting stronger = worth more = higher value
				</em>
				<em className='mt-2'>
					Depreciation = getting weaker = worth less = lower value{' '}
				</em>
				<h2 className='text-2xl font-medium mt-8'>
					Changes in the value of a currency are influenced by supply and
					demand.
				</h2>
				<p className='mt-2'>
					Currencies are bought and sold, just like other goods are. These
					transactions mainly take place in foreign exchange markets,
					marketplaces for trading currencies. Currencies increase in value when
					lots of people want to buy them (meaning there is high demand for
					those currencies), and they decrease in value when fewer people want
					to buy them (i.e., the demand is low). And if a large amount of a
					currency is lying around in the market (i.e., supply), its value will
					go down, just like its value would go up if there were not much of it
					in the market. As you will see below, supply and demand of a currency
					can change based on several factors, including a country’s
					attractiveness to investors, commodity prices, and inflation.
				</p>
				<img
					className='mx-auto my-8'
					src={SupplyAndDemand}
					alt='Fixed vs Floating Currencies'
				/>
				<h2 className='text-2xl font-medium'>
					A country’s attractiveness to investors can affect what its currency
					is worth.
				</h2>
				<p className='mt-2'>
					Stable countries are considered to be attractive destinations for
					investments. The more that people want to invest in a country, the
					more that country’s currency will appreciate or be worth. This is
					because investors from other countries need to use that country’s
					currency in order to invest. For example, a French person who wants to
					invest in the South Korean stock market needs the South Korean won to
					do so. This demand for won drives up its value.
				</p>
				<p className='my-2'>
					The opposite is also true: unstable countries do not attract
					investors. When investors are uncertain about a country’s future, the
					demand for its currency typically falls. This happened in the United
					Kingdom after the Brexit referendum in the summer of 2016. Investors
					didn’t know how the decision to leave the European Union would affect
					the British economy and were thus unwilling to invest in the country;
					this led to the devaluation of the British pound sterling.
				</p>
			</div>
		</div>
	);
}

export default App;
