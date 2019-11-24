import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/chatHeadStyles.module.css';
import lines from '../assets/images/three-lines.png';
import glass from '../assets/images/magnifying-glass.png';

function ChatHead() {
	return (
		<div className={styles.hat}>
			<Link to="/profile">
				<img className={styles.menu} src={lines} alt="lines" />
			</Link>
			<div className={styles.text}>Messenger</div>
			<img className={styles.magnifying} src={glass} alt="glass" />
		</div>
	);
}

export default ChatHead;
