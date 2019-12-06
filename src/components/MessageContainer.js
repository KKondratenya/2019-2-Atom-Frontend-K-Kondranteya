import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/messageContainer.module.css';

/* eslint react/prop-types: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */
function ListItem({ value, user }) {
	let date = '';
	if (value.date.length > 5) {
		date = value.date.slice(11, 16);
	} else {
		date = value.date;
	}
	if ((value.type === 'text' || !value.type) && value.user__username === user) {
		return (
			<div className={styles['my-message']}>
				{value.content}
				<div className={styles.date}>{date}</div>
			</div>
		);
	}
	if ((value.type === 'text' || !value.type) && value.user__username !== user) {
		return (
			<div className={styles.message}>
				<div>{value.user__username}</div>
				{value.content}
				<div className={styles.date}>{date}</div>
			</div>
		);
	}
	if (value.type === 'image') {
		return (
			<div className={styles.message}>
				<img
					src={value.content}
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
					src={value.content}
					onLoad={() => window.URL.revokeObjectURL(value.src)}
					style={{ width: '40vw' }}
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

function List({ id, files, updateFiles, user }) {
	const messageEndRef = useRef(null);

	const [dragEvent, setDrag] = useState(true);

	const [messages, setMessages] = useState([]);

	const pollItems = () => {
		fetch(`https://localhost:8000/chats/message_front?id=${id}&user=${user}`)
			.then((resp) => resp.json())
			.then((data) => setMessages(data.data))
			.then((data) => console.log(messages));
	};

	const t = setInterval(() => pollItems(), 1000);

	useEffect(() => {
		// scrollToBottom();
		return () => {
			clearInterval(t);
		};
	});

	useEffect(() => {
		fetch(`https://localhost:8000/chats/message_front?id=${id}&user=${user}`)
			.then((resp) => resp.json())
			.then((data) => setMessages(data.data))
			.then(scrollToBottom);
	}, []);

	const scrollToBottom = () => {
		messageEndRef.current.scrollIntoView();
	};

	const handleFiles = (event) => {
		event.preventDefault();
		const data = event.dataTransfer;
		const userFiles = data.files;
		for (let i = 0; i < userFiles.length; i += 1) {
			const file = userFiles[i];
			if (file.type.startsWith('image/')) {
				const src = window.URL.createObjectURL(file);
				updateFiles('image', src);
			}
		}
		setDrag(true);
	};

	if (dragEvent) {
		return (
			<div className={styles.result} onDragEnter={() => setDrag(false)}>
				{messages.map((value, index) => (
					<ListItem key={String(index)} value={value} user={user} />
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
