import React, { useState } from 'react';
import styles from '../styles/modalWindowStyles.module.css';
/* eslint react/prop-types: 0 */
function ListItem({ value, index, update }) {
	return (
		<div
			className={styles.contact}
			onClick={() => update(value.username)}
			role="presentation"
		>
			<div className={styles.messagelist}>
				<div>{value.username}</div>
			</div>
		</div>
	);
}

function ModalWindow({ update }) {
	const [users, setUsers] = useState([]);

	const KeyEvent = (event) => {
		const input = event.target;
		if (event.which === 13) {
			fetch(`https://localhost:8000/profile/find_users/${input.value}`)
				.then((resp) => resp.json())
				.then((data) => setUsers(data.data));
		}
	};

	console.log(users);
	return (
		<div className={styles['modal-window']}>
			<div className={styles.hint}>Введите пользователя</div>
			<input
				type="text"
				placeholder="Введите имя"
				onKeyPress={(event) => KeyEvent(event)}
			/>
			<div className={styles['users-list']}>
				{users.map((value, index) => (
					<ListItem
						key={String(index)}
						value={value}
						index={index}
						update={update}
					/>
				))}
			</div>
		</div>
	);
}

export default ModalWindow;