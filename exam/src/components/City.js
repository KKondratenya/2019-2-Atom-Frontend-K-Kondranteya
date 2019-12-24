import React from 'react';
import { Link } from 'react-router-dom';
import { setCity } from '../actions/weatherActions.js';
import '../styles/city.css';
/* eslint react/prop-types: 0 */
/* eslint jsx-a11y/click-events-have-key-events : 0 */
/* eslint jsx-a11y/no-static-element-interactions : 0 */

function City({ city, index }) {
	return (
		<Link to="/city" style={{ textDecoration: 'none' }}>
			<div className="city" onClick={() => setCity(index)}>
				<div className="city-information">
					<div className="name">{city.name}</div>
					<div className="temp">{city.main.temp}</div>
					<div className="celsium">°C</div>
				</div>
				<div className="weather-city">
					<div>Humidity {city.main.humidity}</div>
					<div>{city.wind.speed} m/s</div>
					<div className="weather-temp">
						{city.main.temp_max}/{city.main.temp_min} °C
					</div>
				</div>
			</div>
		</Link>
	);
}

export default City;
