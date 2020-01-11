import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import City from './City.js';
import plus from '../assets/plus-icon.png';
/* eslint react/prop-types: 0 */
function Cities({ city }) {
	useEffect(() => {}, []);
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
				<div className="topic">Manage cities</div>
				{/* <Link to="/geo" style={{ textDecoration: 'none' }}>
						Гео
</Link> */}
				<Link
					className="add-link"
					to="/addCity"
					style={{ textDecoration: 'none' }}
				>
					<img src={plus} />
				</Link>
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
