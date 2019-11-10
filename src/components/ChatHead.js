import React from 'react';
import '../styles/chatHeadStyles.css';
import lines from '../assets/images/three-lines.png';
import glass from '../assets/images/magnifying-glass.png';

function ChatHead() {
	return (
		<div className="chathat">
			<img className="chatmenu" src={lines} alt="lines" />
			<div className="text">Messenger</div>
			<img className="chatmagnifying" src={glass} alt="glass" />
		</div>
	);
}

export default ChatHead;
