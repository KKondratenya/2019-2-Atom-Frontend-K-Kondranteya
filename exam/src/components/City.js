import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCity } from '../actions/weatherActions.js';
import '../styles/city.css';
/* eslint react/prop-types: 0 */
/* eslint jsx-a11y/click-events-have-key-events : 0 */
/* eslint jsx-a11y/no-static-element-interactions : 0 */

function City({ city, index, weatherIcons }) {
	function checkWeather(weather) {
		console.log(weather);
		const image = `http://openweathermap.org/img/wn/${weather}@2x.png`;
		console.log(image);
		return <img src={image} alt="weatherIcon" />;
	}

	return (
		<Link to="/city" style={{ textDecoration: 'none' }}>
			<div className="city" onClick={() => setCity(index)}>
				<div className="city-information">
					<div className="name">{city.name}</div>
					{checkWeather(city.weather[0].icon)}
					<div className="temp">{city.main.temp}</div>
					<div className="celsium">°C</div>
				</div>
				<div className="weather-city">
					<div>
						Humidity {city.main.humidity} | {city.wind.speed} m/s
					</div>
					<div className="weather-temp">
						{city.main.temp_max}/{city.main.temp_min} °C
					</div>
				</div>
			</div>
		</Link>
	);
}

function mapStateToProps(state) {
	return {
		weatherIcons: state.weather.iconWeather,
	};
}

export default connect(mapStateToProps)(City);
