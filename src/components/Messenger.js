import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChatHead from './ChatHead.js';
import ProfileHead from './ProfileHead.js';
import ProfileEdit from './ProfileEdit.js';
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
			contact_index: 0,
			files: [],
		};
		this.updateValue = this.updateValue.bind(this);
		this.updateDisplay = this.updateDisplay.bind(this);
		this.addContact = this.addContact.bind(this);
	}

	updateValue = (type, value) => {
		const message = {};
		const date = new Date();
		const Hours = `0${date.getHours()}`.slice(-2);
		const Minutes = `0${date.getMinutes()}`.slice(-2);
		message.inner = value;
		message.date = `${Hours}:${Minutes}`;
		message.user = 'user';
		message.type = type;
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
			const json = JSON.stringify(changeState);
			localStorage.setItem('box-container', json);
			return {
				name: changeState,
				contact_index: index,
			};
		});
	};

	updateFiles = (type, src) => {
		const message = {};
		const date = new Date();
		const Hours = `0${date.getHours()}`.slice(-2);
		const Minutes = `0${date.getMinutes()}`.slice(-2);
		message.inner = src;
		message.date = `${Hours}:${Minutes}`;
		message.user = 'user';
		message.type = type;
		const data = new FormData();
		data.append(type, src);
		fetch('https://tt-front.now.sh/upload', {
			method: 'POST',
			body: data,
		});
		this.setState(function(prevState) {
			return { files: [...prevState.files, message] };
		});
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
		this.setState(function(prevState) {
			const json = JSON.stringify([...prevState.name, contact]);
			localStorage.setItem('box-container', json);
			return { name: [...prevState.name, contact] };
		});
	};

	render() {
		return (
			<Router>
				<div className="messenger">
					<Switch>
						<Route path="/chat">
							<div className="chat">
								<MessageHead
									update={this.updateDisplay}
									nick={this.state.name[this.state.contact_index].user}
								/>
								<List
									name={this.state.name[this.state.contact_index].messages}
									files={this.state.files}
									updateFiles={this.updateFiles}
								/>
								<FormInput
									updateValue={this.updateValue}
									updateFiles={this.updateFiles}
								/>
							</div>
						</Route>
						<Route path="/profile">
							<ProfileHead />
							<ProfileEdit />
						</Route>
						<Route path="/">
							<div className="contact-list">
								<ChatHead />
								<ChatList name={this.state.name} update={this.updateDisplay} />
								<div
									className="button"
									onClick={this.addContact}
									role="presentation"
								>
									<img src={pencil} alt="create_contact" className="pencil" />
								</div>
							</div>
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default Messenger;
