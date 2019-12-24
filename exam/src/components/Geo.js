import React, { useEffect, useState } from 'react';
import '../styles/city.css';
import { Link } from 'react-router-dom';
/* eslint react/prop-types: 0 */
function Geo({ city }) {
	const [cityDaily, setCity] = useState(false);
	let renderInfo;
	const geoLocation = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude } = position.coords;
				const { longitude } = position.coords;
				console.log(latitude, longitude);
				fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(
						1,
					)}&lon=${longitude.toFixed(
						1,
					)}&appid=7ae3973c1cff0f607e622fa2bcc37d48`,
				)
					.then((resp) => resp.json())
					.then((data) => setCity(data));
			});
		} else {
			console.log('Геолокация недоступна');
		}
	};

	useEffect(() => {
		geoLocation();
	}, []);

	if (cityDaily) {
		renderInfo = (
			<div>
				<div className="city-name">{cityDaily.name}</div>
				<div className="temperature">
					<div className="temp-info">{cityDaily.main.temp}</div>
					<div className="celsium-info">°C</div>
				</div>
				<div className="weather">{cityDaily.weather[0].main}</div>
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

// export default Cities;
export default Geo;
