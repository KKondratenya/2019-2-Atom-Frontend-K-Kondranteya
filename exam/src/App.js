import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cities from './components/Cities';
import CityInfo from './components/CityInfo';
import Geo from './components/Geo';
import ManageCities from './components/ManageCities';
import { setWeather } from './actions/weatherActions.js';
import './App.css';

function App() {
	const getCities = () => {
		fetch(
			'https://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743,2988507,5128581,5368361,2267057,625144,515003&units=metric&appid=7ae3973c1cff0f607e622fa2bcc37d48',
		)
			.then((resp) => resp.json())
			.then((data) => setWeather(data.list));
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
				<Route path="/geo">
					<Geo />
				</Route>
				<Route path="/addCity">
					<ManageCities />
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
