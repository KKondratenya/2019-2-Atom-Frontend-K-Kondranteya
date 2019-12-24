import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cities from './components/Cities.js';
import CityInfo from './components/CityInfo.js';
import Geo from './components/Geo';
import { setWeather } from './actions/weatherActions.js';
import './App.css';

function App() {
	const getCities = () => {
		fetch(
			'https://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=7ae3973c1cff0f607e622fa2bcc37d48',
			{ headers: { origin: document.origin } },
		)
			.then((resp) => resp.json())
			.then((data) => setWeather(data.list));
	};
	// fetch(
	// 		'https://api.openweathermap.org/data/2.5/weather?q=London&appid=7ae3973c1cff0f607e622fa2bcc37d48',
	// 	).then((resp) => resp.json())
	// 	.then(data => (cities.push(data)))
	// 	.then(() => fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=7ae3973c1cff0f607e622fa2bcc37d48'))
	// 	.then(resp => resp.json())
	// 	.then(data => console.log(data))

	useEffect(() => {
		getCities();
	}, []);

	return (
		<Router>
			<Switch>
				<Route path="/city">
					<CityInfo />
				</Route>
				<Route path="/geo">
					<Geo />
				</Route>
				<Route path="">
					<div className="App">
						<Cities />
					</div>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
