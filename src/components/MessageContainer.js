import React, { useEffect, useRef, useState } from 'react';
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
					height="100px"
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

function List({ name, files, updateFiles }) {
	const messageEndRef = useRef(null);
	const [dragEvent, setDrag] = useState(true);

	const scrollToBottom = () => {
		messageEndRef.current.scrollIntoView();
	};

	const handleFiles = (event) => {
		event.preventDefault();
		const data = event.dataTransfer;
		const { userFiles } = data;
		for (let i = 0; i < userFiles.length; i += 1) {
			const file = userFiles[i];
			if (file.type.startsWith('image/')) {
				const src = window.URL.createObjectURL(file);
				updateFiles('image', src);
			}
		}
		setDrag(true);
	};

	useEffect(scrollToBottom);

	if (dragEvent) {
		return (
			<div className={styles.result} onDragEnter={() => setDrag(false)}>
				{name.map((value, index) => (
					<ListItem key={String(index)} value={value} />
				))}
				{files.map((value, index) => (
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

export default List;
