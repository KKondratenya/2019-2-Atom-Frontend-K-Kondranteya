import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import City from './City.js';
/* eslint react/prop-types: 0 */
function Cities({ city }) {
	const getCity = () => {
		fetch(
			'https://api.openweathermap.org/data/2.5/forecast?q=London&appid=7ae3973c1cff0f607e622fa2bcc37d48',
			{ headers: { origin: document.origin } },
		)
			.then((resp) => resp.json())
			.then((data) => console.log(data));
	};

	useEffect(() => {
		// getCity();
	}, []);
	let cityRender;
	if (city.length) {
		cityRender = (
			<div>
				{city.map((value, index) => (
					<City key={String(index)} city={value} index={index} />
				))}
			</div>
		);
	} else {
		cityRender = null;
	}
	return (
		<div>
			<div className="heading">
				<div>
					<div>Manage cities</div>
					<Link to="/geo" style={{ textDecoration: 'none' }}>
						Гео
					</Link>
				</div>
			</div>
			{cityRender}
		</div>
	);
}
function mapStateToProps(state) {
	return {
		city: state.weather.cities,
	};
}
// export default Cities;
export default connect(mapStateToProps)(Cities);
