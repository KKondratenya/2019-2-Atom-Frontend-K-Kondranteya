import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/chatHeadStyles.module.css';
import lines from '../assets/images/three-lines.png';
import glass from '../assets/images/magnifying-glass.png';
import plus from '../assets/images/plus.png';
/* eslint react/prop-types: 0 */
function ChatHead({ update }) {
	return (
		<div className={styles.hat}>
			<Link to="/profile">
				<img className={styles.menu} src={lines} alt="lines" />
			</Link>
			<div className={styles.text}>Messenger</div>
			<img
				className={styles.plus}
				src={plus}
				onClick={update}
				alt="plus"
				role="presentation"
			/>
			<img className={styles.magnifying} src={glass} alt="glass" />
		</div>
	);
}

export default ChatHead;
