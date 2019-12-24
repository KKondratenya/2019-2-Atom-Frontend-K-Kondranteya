import React , { useEffect, useRef, useState } from 'react';
import '../styles/city.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
function CityInfo({ city }) {
	const [cityDaily, setCity] = useState(false);
	console.log(city.id)
	let renderInfo;
	const getCities = () => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=7ae3973c1cff0f607e622fa2bcc37d48`
			).then((resp) => resp.json())
			.then(data => (setCity(data)))
	}

	useEffect(() => {
		getCities();
	}, [getCities]);

	if (cityDaily) {
		let renderInfo = (<div>cityDaily.id</div>)
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
			<div>
				<div className="city-name">{city.name}</div>
				<div className="temperature">
					<div className="temp-info">{city.main.temp}</div>
					<div className="celsium-info">°C</div>
				</div>
				<div className="weather">
					{city.weather[0].main}
				</div>
				{renderInfo}
			</div>
		</div>
	);
}
function mapStateToProps(state) {
	return {
		city: state.weather.cities[state.weather.index],
	};
}
//export default Cities;
export default connect(mapStateToProps)(CityInfo);
