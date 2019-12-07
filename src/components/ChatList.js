import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import avatar from '../assets/images/spongebob.jpg';
import styles from '../styles/chatList.module.css';
import { switchChat } from '../actions/messengerActions';
/* eslint react/prop-types: 0 */
function ListItem({ value, lastmessage, index }) {
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
				onClick={() => switchChat(index)}
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

function ChatList({ chats }) {
	return (
		<div className={styles.list}>
			{chats.map((value, index) => (
				<ListItem
					key={String(index)}
					value={value.user}
					lastmessage={value.messages[value.messages.length - 1]}
					index={index}
				/>
			))}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		chats: state.message.name,
	};
}

export default connect(mapStateToProps)(ChatList);
