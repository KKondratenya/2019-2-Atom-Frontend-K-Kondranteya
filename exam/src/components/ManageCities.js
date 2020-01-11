import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCity } from '../actions/weatherActions.js';
import '../styles/city.css';
/* eslint react/prop-types: 0 */
/* eslint jsx-a11y/click-events-have-key-events : 0 */
/* eslint jsx-a11y/no-static-element-interactions : 0 */
/* eslint react/button-has-type : 0 */

function ManageCities({ weatherIcons }) {
	const [city, setCity] = useState('');
	const [city2, setCity2] = useState(null);
	const [render, setRender] = useState(<div>Input city</div>);

	function find() {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7ae3973c1cff0f607e622fa2bcc37d48`,
		)
			.then((resp) => resp.json())
			.then((data) => {
				if (data.cod === 200) {
					setCity2(data);
				} else {
					setRender(<div>Can not find {city} :(</div>);
				}
			});
	}

	function checkWeather(weather) {
		console.log(weather);
		const image = `http://openweathermap.org/img/wn/${weather}@2x.png`;
		console.log(image);
		return <img src={image} alt="weatherIcon" />;
	}

	useEffect(() => {
		if (city2) {
			console.log(city2);
			setRender(
				<div className="detail-temp">
					<div className="city-name">{city2.name}</div>
					<div className="temperature">
						<div className="temp-info">{city2.main.temp}</div>
						<div className="celsium-info">°C</div>
						{checkWeather(city2.weather[0].icon)}
					</div>
					<div className="weather">{city2.weather[0].main}</div>
					<button onClick={() => addCity(city2)}>Добавить</button>
				</div>,
			);
		}
	}, [city2]);

	return (
		<div>
			<Link to="/" style={{ textDecoration: 'none' }}>
				Вернуться
			</Link>
			<div>
				<input
					type="text"
					value={city}
					onChange={(event) => {
						setCity(event.target.value);
					}}
				/>
				<button onClick={() => find()}>Найти</button>
			</div>
			{render}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		weatherIcons: state.weather.iconWeather,
	};
}

export default connect(mapStateToProps)(ManageCities);
