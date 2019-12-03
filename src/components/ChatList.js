import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/images/spongebob.jpg';
import styles from '../styles/chatList.module.css';
/* eslint react/prop-types: 0 */
function ListItem({ value, update, index }) {
	let date = value.last_message_date;
	date = date.slice(11, 16);
	return (
		<Link to="/chat" style={{ textDecoration: 'none' }}>
			<div
				className={styles.contact}
				onClick={() => update(value.id, value.title, value.is_group_chat)}
				role="presentation"
			>
				<img className={styles.avatar} src={avatar} alt="avatar" />
				<div className={styles.messagelist}>
					<div className={styles.date}>{date}</div>
					<div className={styles.user}>{value.title}</div>
					<div className={styles.inner}>{value.last_message_text}</div>
				</div>
			</div>
		</Link>
	);
}

function ChatList({ update, modalWindow, user }) {
	const [chats, setChats] = useState([]);
	const pollItems = () => {
		fetch(`https://localhost:8000/chats/chat_list_front?user=${user}`)
			.then((resp) => resp.json())
			.then((data) => setChats(data.data));
	};

	const t = setInterval(() => pollItems(), 1000);

	useEffect(() => {
		return () => {
			clearInterval(t);
		};
	});

	useEffect(() => {
		pollItems();
	}, []);

	return (
		<div
			className={
				modalWindow
					? styles['list-with-pointer']
					: styles['list-without-pointer']
			}
		>
			{chats.map((value, index) => (
				<ListItem
					key={String(index)}
					value={value}
					update={update}
					index={index}
				/>
			))}
		</div>
	);
}

export default ChatList;
