import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/profileChatstyles.module.css';
/* eslint react/prop-types: 0 */

function ListItem({ value, index, update }) {
	return (
		<div className={styles.profile} role="presentation">
			<div className={styles.messagelist}>
				<div>{value.username}</div>
			</div>
		</div>
	);
}

function ProfileGroup({ id, leave }) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch(`https://localhost:8000/chats/chat_members?id=${id}`)
			.then((resp) => resp.json())
			.then((data) => setUsers(data.data));
	}, [id]);

	return (
		<div>
			<Link to="/" style={{ textDecoration: 'none' }}>
				<div
					className={styles.options}
					onClick={() => leave(id)}
					role="presentation"
				>
					Leave group
				</div>
			</Link>
			<div className={styles.line} />
			<div className={styles['profile-chat']}>
				{users.map((value, index) => (
					<ListItem key={String(index)} value={value} index={index} />
				))}
			</div>
		</div>
	);
}

export default ProfileGroup;
