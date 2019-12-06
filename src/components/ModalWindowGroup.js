import React, { useState } from 'react';
import styles from '../styles/modalWindowStyles.module.css';
import close from '../assets/images/close.png';
/* eslint react/prop-types: 0 */
function ModalWindowGroup({ updateUserName, error, closeWindow }) {
	const KeyEvent = (event) => {
		const input = event.target;
		if (event.which === 13) {
			updateUserName(input.value);
		}
	};

	return (
		<div className={styles['modal-window']}>
			<img
				className={styles.close}
				src={close}
				onClick={() => closeWindow()}
				role="presentation"
			/>
			<div className={styles.hint}>Введите чат</div>
			<input
				type="text"
				placeholder="Введите чат"
				onKeyPress={(event) => KeyEvent(event)}
			/>
			<div className={styles.hint}>{error}</div>
		</div>
	);
}

export default ModalWindowGroup;
