import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/messageHeadStyles.module.css';
import glass from '../assets/images/magnifying-glass.png';
import arrow from '../assets/images/left-arrow.png';
import avatar from '../assets/images/spongebob.jpg';
import menu from '../assets/images/menu.png';

/* eslint react/prop-types: 0 */
function MessageHead({ update, nick }) {
	return (
		<div className={styles.hat}>
			<Link to="/">
				<img
					className={styles.arrow}
					src={arrow}
					onClick={() => update(-1)}
					alt="arrow"
					role="presentation"
				/>
			</Link>
			<img className={styles.avatar} src={avatar} alt="avatar" />
			<div className={styles.user}>
				{nick}
				<div className={styles.time}>Online</div>
			</div>
			<img className={styles.magnifying} src={glass} alt="glass" />
			<img className={styles.menu} src={menu} alt="menu" />
		</div>
	);
}

export default MessageHead;
