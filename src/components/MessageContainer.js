import React, { useEffect, useRef } from 'react';
import '../styles/messageContainer.css';

/* eslint react/prop-types: 0 */
function ListItem({ value }) {
	return (
		<div className="message">
			{value.inner}
			<div className="date">{value.date}</div>
		</div>
	);
}

function List({ name }) {
	const messageEndRef = useRef(null);

	const scrollToBottom = () => {
		messageEndRef.current.scrollIntoView();
	};

	useEffect(scrollToBottom);

	return (
		<div className="result">
			{name.map((value, index) => (
				<ListItem key={String(index)} value={value} />
			))}
			<div ref={messageEndRef} />
		</div>
	);
}

export default List;
