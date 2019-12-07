import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { sendFiles } from '../actions/messengerActions';
import styles from '../styles/messageContainer.module.css';
/* eslint react/prop-types: 0 */
function ListItem({ value }) {
	if (value.type === 'text') {
		return (
			<div className={styles.message}>
				{value.inner}
				<div className={styles.date}>{value.date}</div>
			</div>
		);
	}
	if (value.type === 'image') {
		return (
			<div className={styles.message}>
				<img
					src={value.inner}
					alt="message"
					onLoad={() => window.URL.revokeObjectURL(value.src)}
				/>
				<div className={styles.date}>{value.date}</div>
			</div>
		);
	}
	if (value.type === 'audio') {
		return (
			<div className={styles.message}>
				<audio
					controls
					src={value.inner}
					onLoad={() => window.URL.revokeObjectURL(value.src)}
				>
					<track kind="captions" />
				</audio>
				<div className={styles.date}>{value.date}</div>
			</div>
		);
	}
	if (value.type === 'geo') {
		return (
			<div className={styles.message}>
				Ваша геолокация <a href={value.inner}> {value.inner} </a>
			</div>
		);
	}
}

function List({ message, file }) {
	const messageEndRef = useRef(null);

	const [dragEvent, setDrag] = useState(true);

	const scrollToBottom = () => {
		messageEndRef.current.scrollIntoView();
	};

	const handleFiles = (event) => {
		event.preventDefault();
		const data = event.dataTransfer;
		const userFiles = data.files;
		for (let i = 0; i < userFiles.length; i += 1) {
			const fileSend = userFiles[i];
			if (file.Sendtype.startsWith('image/')) {
				const src = window.URL.createObjectURL(fileSend);
				sendFiles(src, 'image');
			}
		}
		setDrag(true);
	};

	useEffect(scrollToBottom);

	if (dragEvent) {
		return (
			<div className={styles.result} onDragEnter={() => setDrag(false)}>
				{message.map((value, index) => (
					<ListItem key={String(index)} value={value} />
				))}
				{file.map((value, index) => (
					<ListItem key={String(index)} value={value} />
				))}

				<div ref={messageEndRef} />
			</div>
		);
	}
	return (
		<div
			className={styles['result-drag']}
			ref={messageEndRef}
			onDragLeave={() => setDrag(true)}
			onDrop={(event) => handleFiles(event)}
			onDragOver={(event) => {
				event.preventDefault();
			}}
		/>
	);
}

function mapStateToProps(state) {
	return {
		message: state.message.name[state.message.contact_index].messages,
		file: state.message.files,
	};
}

export default connect(mapStateToProps)(List);
