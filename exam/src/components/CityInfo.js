import React from 'react';
import '../styles/city.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
function CityInfo({ city }) {
	return (
		<div>
			<div>
				<Link to="/" style={{ textDecoration: 'none' }}>
					Вернуться
				</Link>
			</div>
			<div>
				<div className="city-name">{city.name}</div>
				<div className="temp-info">{city.main.temp}</div>
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
