import { CurrencyList } from './components/utils/CurrencyList';
import { GetAllAvailableCurrencies } from './components/data/APICalls';
import { getEmojiByCurrencyCode } from 'country-currency-emoji-flags';

function App() {
	return (
		<div className='w-screen h-screen'>
			<h1>Currency Hub</h1>
			<hr />
			<h3>Compare Currencies of Your Choice</h3>
			<div className='flex'></div>
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
