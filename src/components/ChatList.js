import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/images/spongebob.jpg';
import '../styles/chatList.css';
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
				className="contact"
				onClick={() => update(index)}
				role="presentation"
			>
				<img className="avatarchat" src={avatar} alt="avatar" />
				<div className="messagelist">
					<div className="datechat">{message.date}</div>
					<div className="userchat">{value}</div>
					<div className="innerchat">{message.inner}</div>
				</div>
			</div>
		</Link>
	);
}

function ChatList({ name, update }) {
	return (
		<div className="list">
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
