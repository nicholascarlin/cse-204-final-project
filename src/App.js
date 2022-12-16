import { GetAllAvailableCurrencies } from './components/data/APICalls';

function App() {
	return (
		<div className='App'>
			<div>test</div>
			<button
				onClick={() => {
					GetAllAvailableCurrencies();
				}}
				className='bg-red-500'>
				Get All
			</button>
		</div>
	);
}

export default App;
