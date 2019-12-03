import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/profileChatHeadStyles.module.css';
import plus from '../assets/images/plus.png';
import arrow from '../assets/images/left-arrow.png';
import avatar from '../assets/images/spongebob.jpg';
/* eslint react/prop-types: 0 */

function ProfileGroupHead({ title, addUser }) {
	return (
		<div className={styles.hat}>
			<Link to="/chat">
				<img className={styles.arrow} src={arrow} alt="lines" />
			</Link>
			<img className={styles.avatar} src={avatar} alt="plus" />
			<div className={styles.title}>{title}</div>
			<img
				className={styles.plus}
				onClick={() => addUser()}
				src={plus}
				alt="plus"
				role="presentation"
			/>
		</div>
	);
}

export default ProfileGroupHead;
