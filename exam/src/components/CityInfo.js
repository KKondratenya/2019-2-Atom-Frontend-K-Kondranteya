import React, { useEffect, useState } from 'react';
import '../styles/city.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { kelvinToCelsium } from '../functions/kelvinToCelsium';
/* eslint react/prop-types: 0 */
/* eslint react-hooks/exhaustive-deps : 0 */
function CityInfo({ city, weatherIcons }) {
	const [cityDaily, setCity] = useState(false);
	console.log(city.id);
	let renderInfo;
	const getCities = () => {
		console.log(city.id);
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?id=${city.id}&units=metric&appid=7ae3973c1cff0f607e622fa2bcc37d48`,
		)
			.then((resp) => resp.json())
			.then((data) => setCity(data));
	};

	function checkWeather(weather) {
		const image = `http://openweathermap.org/img/wn/${weather}@2x.png`;
		console.log(image);
		return <img src={image} alt="weatherIcon" />;
	}
	useEffect(() => {
		getCities();
	}, []);

	if (cityDaily) {
		renderInfo = (
			<div>
				<div className="detail-temp">
					<div className="city-name">{city.name}</div>
					<div className="temperature">
						<div className="temp-info">{city.main.temp}</div>
						<div className="celsium-info">°C</div>
					</div>
					<div className="weather">{city.weather[0].main}</div>
					<div className="city-temp">
						Next three days:
						<div className="day-info">
							{checkWeather(cityDaily.list[0].weather[0].icon)}
							<div>{cityDaily.list[0].weather[0].main}</div>
							<div className="day-temp">{cityDaily.list[0].main.temp}</div>
						</div>
						<div className="day-info">
							{checkWeather(cityDaily.list[7].weather[0].icon)}
							<div>{cityDaily.list[7].weather[0].main}</div>
							<div className="day-temp">{cityDaily.list[7].main.temp}</div>
						</div>
						<div className="day-info">
							{checkWeather(cityDaily.list[15].weather[0].icon)}
							<div>{cityDaily.list[15].weather[0].main}</div>
							<div className="day-temp">{cityDaily.list[15].main.temp}</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		renderInfo = null;
	}
	return (
		<div>
			<div>
				<Link to="/" style={{ textDecoration: 'none' }}>
					Вернуться
				</Link>
			</div>
			{renderInfo}
		</div>
	);
}
function mapStateToProps(state) {
	return {
		city: state.weather.cities[state.weather.index],
		weatherIcons: state.weather.iconWeather,
	};
}
// export default Cities;
export default connect(mapStateToProps)(CityInfo);
