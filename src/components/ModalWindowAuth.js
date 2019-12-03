import React from 'react';
import styles from '../styles/modalWindowStyles.module.css';

/* eslint react/prop-types: 0 */
function ModalWindowAuth({ updateUserName }) {
	const KeyEvent = (event) => {
		const input = event.target;
		if (event.which === 13) {
			updateUserName(input.value);
		}
	};

	return (
		<div className={styles['modal-window']}>
			<div className={styles.hint}>Введите пользователя</div>
			<input
				type="text"
				placeholder="Введите имя"
				onKeyPress={(event) => KeyEvent(event)}
			/>
		</div>
	);
}

export default ModalWindowAuth;
