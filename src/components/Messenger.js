import React from 'react';
import ChatHead from './ChatHead.js';
import MessageHead from './MessageHead.js';
import FormInput from './FormInput.js';
import List from './MessageContainer.js';
import ChatList from './ChatList';
import pencil from '../assets/images/pencil-edit-button.png';

/* eslint react/destructuring-assignment: 0 */
class Messenger extends React.Component {
	constructor(props) {
		super(props);
		const box = localStorage.getItem('box-container');
		let messageBox = null;
		if (box) {
			messageBox = JSON.parse(box);
		} else {
			messageBox = [
				{
					user: 'User',
					messages: [],
				},
			];
		}
		this.state = {
			name: messageBox,
			display_chat: { display: 'none' },
			display_contact: { display: 'block' },
			contact_index: 0,
		};
		this.updateValue = this.updateValue.bind(this);
		this.updateDisplay = this.updateDisplay.bind(this);
		this.addContact = this.addContact.bind(this);
	}

	updateValue = (value) => {
		const message = {};
		const date = new Date();
		const Hours = `0${date.getHours()}`.slice(-2);
		const Minutes = `0${date.getMinutes()}`.slice(-2);
		message.inner = value;
		message.date = `${Hours}:${Minutes}`;
		message.user = 'user';
		this.setState(function(prevState) {
			const changeState = [...prevState.name];
			changeState[prevState.contact_index].messages.push(message);
			let index = prevState.contact_index;
			if (prevState.contact_index !== 0) {
				const buf = prevState.name[prevState.contact_index];
				changeState.splice(prevState.contact_index, 1);
				changeState.unshift(buf);
				index = 0;
			}
			return {
				name: changeState,
				contact_index: index,
			};
		});
		const json = JSON.stringify(this.state.name);
		localStorage.setItem('box-container', json);
	};

	updateDisplay = (index) => {
		this.setState((prevState) => ({
			display_chat: prevState.display_contact,
			display_contact: prevState.display_chat,
		}));
		if (index !== -1) {
			this.setState({
				contact_index: index,
			});
		}
	};

	addContact = () => {
		const contact = {};
		contact.user = `User ${this.state.name.length}`;
		contact.messages = [];
		this.setState((prevState) => ({ name: [...prevState.name, contact] }));
		const json = JSON.stringify(this.state.name);
		localStorage.setItem('box-container', json);
	};

	render() {
		return (
			<div className="messenger">
				<div className="contact-list" style={this.state.display_contact}>
					<ChatHead />
					<ChatList name={this.state.name} update={this.updateDisplay} />
					<div className="button" onClick={this.addContact} role="presentation">
						<img src={pencil} alt="create_contact" />
					</div>
				</div>
				<div className="chat" style={this.state.display_chat}>
					<MessageHead
						update={this.updateDisplay}
						nick={this.state.name[this.state.contact_index].user}
					/>
					<List name={this.state.name[this.state.contact_index].messages} />
					<FormInput value="Hi" updateValue={this.updateValue} />
				</div>
			</div>
		);
	}
}

export default Messenger;
