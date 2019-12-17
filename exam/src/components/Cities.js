import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { setCity } from '../actions/weatherActions.js';
import City from './City';

function Cities({ city }) {
	const [cities, setCities] = useState([]);

	const getCity = () => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=london,UK&appid=b41984b8b5135f1695c5faac30990138',
			{ headers: { origin: document.origin } },
		)
			.then((resp) => resp.json())
			.then((data) => console.log(data));
	};

	useEffect(() => {
		console.log(city);
		getCity();
	}, []);

	return (
		<div>
			Manage cities
			{city.map((value, index) => (
				<City
					key={String(index)}
					city={value}
					onClick={(index) => setCity(index)}
				/>
			))}
		</div>
	);
}
function mapStateToProps(state) {
	return {
		city: state.weather.cities,
	};
}
//export default Cities;
export default connect(mapStateToProps)(Cities);
