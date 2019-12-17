import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cities from './components/Cities';
import CityInfo from './components/CityInfo';
import { setWeather } from './actions/weatherActions.js';
import './App.css';

function App() {
	let cities = [];

	const getCities = () => {
		fetch(
			'http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=b41984b8b5135f1695c5faac30990138',
			{ headers: { origin: document.origin } },
		).then((resp) => {
			console.log(resp.status);
		});
		//.then(data => setWeather(data.list))
	};

	useEffect(() => {
		getCities();
	}, []);

	return (
		<Router>
			<Switch>
				<Route path="/city">
					<CityInfo />
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
