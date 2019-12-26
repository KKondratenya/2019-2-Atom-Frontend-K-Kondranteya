import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../styles/messageHeadStyles.module.css';
import glass from '../assets/images/magnifying-glass.png';
import arrow from '../assets/images/left-arrow.png';
import avatar from '../assets/images/spongebob.jpg';
import menu from '../assets/images/menu.png';

/* eslint react/prop-types: 0 */
function MessageHead({ userName }) {
	return (
		<div className={styles.hat}>
			<Link to="/">
				<img className={styles.arrow} src={arrow} alt="arrow" />
			</Link>
			<img className={styles.avatar} src={avatar} alt="avatar" />
			<div className={styles.user}>
				{userName}
				<div className={styles.time}>Online</div>
			</div>
			<img className={styles.magnifying} src={glass} alt="glass" />
			<img className={styles.menu} src={menu} alt="menu" />
		</div>
	);
}

function mapStateToProps(state) {
	return {
		userName: state.message.name[state.message.contact_index].user,
	};
}

export default connect(mapStateToProps)(MessageHead);
