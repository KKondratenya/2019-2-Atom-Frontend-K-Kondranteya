import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/images/left-arrow.png';
import '../styles/profileHeadStyles.css';
import tick from '../assets/images/tick.png';

function ProfileHead() {
	return (
		<div className="profilehat">
			<Link to="/">
				<img className="profilearrow" src={arrow} alt="arrow" />
			</Link>
			<div className="text">Edit Profile</div>
			<img className="profilemagnifying" src={tick} alt="tick" />
		</div>
	);
}

export default ProfileHead;
