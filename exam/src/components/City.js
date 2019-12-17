import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/city.css';
function City({ city }) {
	return (
		<Link to="/city" style={{ textDecoration: 'none' }}>
			<div className="city">
				<div>{city.name}</div>
				<div className="temp">{city.main.temp}</div>
			</div>
		</Link>
	);
}

export default City;
