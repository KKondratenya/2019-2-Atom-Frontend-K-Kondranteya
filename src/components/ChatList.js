import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/images/spongebob.jpg';
import styles from '../styles/chatList.module.css';
/* eslint react/prop-types: 0 */
function ListItem({ value, lastmessage, update, index }) {
	let message = lastmessage;
	if (!message) {
		message = {};
		message.inner = 'Начните диалог с пользователем';
		message.date = '';
	}
	return (
		<Link to="/chat" style={{ textDecoration: 'none' }}>
			<div
				className={styles.contact}
				onClick={() => update(index)}
				role="presentation"
			>
				<img className={styles.avatar} src={avatar} alt="avatar" />
				<div className={styles.messagelist}>
					<div className={styles.date}>{message.date}</div>
					<div className={styles.user}>{value}</div>
					<div className={styles.inner}>{message.inner}</div>
				</div>
			</div>
		</Link>
	);
}

function ChatList({ name, update }) {
	return (
		<div className={styles.list}>
			{name.map((value, index) => (
				<ListItem
					key={String(index)}
					value={value.user}
					lastmessage={value.messages[value.messages.length - 1]}
					update={update}
					index={index}
				/>
			))}
		</div>
	);
}

export default ChatList;
