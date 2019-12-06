import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChatHead from './ChatHead.js';
import ProfileHead from './ProfileHead.js';
import ProfileEdit from './ProfileEdit.js';
import MessageHead from './MessageHead.js';
import FormInput from './FormInput.js';
import List from './MessageContainer.js';
import ModalWindow from './ModalWindow.js';
import ModalWindowGroup from './ModalWindowGroup.js';
import ProfileGroup from './ProfileGroup.js';
import ProfileGroupHead from './ProfileGroupHead.js';
import ModalWindowAuth from './ModalWindowAuth.js';
import ChatList from './ChatList';
import pencil from '../assets/images/pencil-edit-button.png';

/* eslint react/destructuring-assignment: 0 */
class Messenger extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: 'User',
			contact_index: 14,
			contact_title: '',
			is_group_chat: false,
			files: [],
			modal_window_user: true,
			modal_window_add_contact: false,
			modal_window_add: false,
			modal_window_create_chat: false,
			error: '',
		};
		this.updateDisplay = this.updateDisplay.bind(this);
		this.addContact = this.addContact.bind(this);
		this.updateFiles = this.updateFiles.bind(this);
	}

	updateFiles = (type, src) => {
		const message = {};
		const date = new Date();
		const Hours = `0${date.getHours()}`.slice(-2);
		const Minutes = `0${date.getMinutes()}`.slice(-2);
		message.content = src;
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

	updateDisplay = (id, contactTitle, isGroupChat) => {
		console.log(contactTitle);
		if (id !== -1) {
			this.setState({
				contact_index: id,
				contact_title: contactTitle,
				is_group_chat: isGroupChat,
			});
		}
	};

	leaveChat = (id) => {
		fetch(
			`https://localhost:8000/chats/leave_chat?id=${id}&user=${this.state.user}`,
		).then((res) => res.json());
	};

	addContact = () => {
		this.setState({
			modal_window_add_contact: true,
		});
	};

	closeAddContact = () => {
		console.log('Hi');
		this.setState({
			modal_window_add_contact: false,
		});
	};

	addUser = () => {
		this.setState({
			modal_window_add: true,
		});
	};

	closeAddUser = () => {
		this.setState({
			modal_window_add: false,
		});
	};

	addChat = () => {
		this.setState({
			modal_window_create_chat: true,
		});
	};

	closeAddChat = () => {
		this.setState({
			modal_window_create_chat: false,
		});
	};

	contactCreate = (value) => {
		fetch(
			`https://localhost:8000/chats/contact?contact=${value}&user=${this.state.user}`,
		)
			.then((resp) => resp.json())
			.then((data) => console.log(data));
		this.setState({
			modal_window_add_contact: false,
		});
	};

	updateUserName = (value) => {
		fetch(`https://localhost:8000/profile/create/${value}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data.data);
				if (data.data !== 'change username') {
					this.setState({
						user: value,
						modal_window_user: false,
					});
				} else {
					this.setState({
						error: 'Change username',
					});
				}
			});
	};

	createChat = (value) => {
		this.setState({
			modal_window_create_chat: false,
		});
		fetch(
			`https://localhost:8000/chats/create_chat_front?user=${this.state.user}&title=${value}`,
			{ method: 'POST' },
		).then((res) => res.json());
	};

	addUserToChat = (value) => {
		this.setState({
			modal_window_add: false,
		});
		fetch(
			`https://127.0.0.1:8000/chats/add_user_to_chat?id=${this.state.contact_index}&user=${value}`,
			{ method: 'POST' },
		).then((res) => res.json());
	};

	render() {
		const modalWindowAddChat = this.state.modal_window_create_chat ? (
			<ModalWindowGroup
				updateUserName={this.createChat}
				closeWindow={this.closeAddChat}
			/>
		) : null;
		const modalWindowAdd = this.state.modal_window_add ? (
			<ModalWindow
				update={this.addUserToChat}
				closeWindow={this.closeAddUser}
			/>
		) : null;
		const modalAuth = this.state.modal_window_user ? (
			<ModalWindowAuth
				updateUserName={this.updateUserName}
				error={this.state.error}
			/>
		) : null;
		const modalAddContact = this.state.modal_window_add_contact ? (
			<ModalWindow
				update={this.contactCreate}
				closeWindow={this.closeAddContact}
			/>
		) : null;
		return (
			<Router>
				<div className="messenger">
					<Switch>
						<Route path="/chat">
							<div className="chat">
								<MessageHead
									updateDisplay={this.updateDisplay}
									contactTitle={this.state.contact_title}
									isGroupChat={this.state.is_group_chat}
								/>
								<List
									id={this.state.contact_index}
									files={this.state.files}
									updateFiles={this.updateFiles}
									user={this.state.user}
								/>
								<FormInput
									user={this.state.user}
									id={this.state.contact_index}
									updateFiles={this.updateFiles}
								/>
							</div>
						</Route>
						<Route path="/chat_profile">
							{modalWindowAdd}
							<ProfileGroupHead
								title={this.state.contact_title}
								addUser={this.addUser}
							/>
							<ProfileGroup
								id={this.state.contact_index}
								leave={this.leaveChat}
							/>
						</Route>
						<Route path="/profile">
							<ProfileHead />
							<ProfileEdit user={this.state.user} />
						</Route>
						<Route path="/">
							<div className="contact-list">
								<ChatHead update={this.addChat} />
								{modalWindowAddChat}
								{modalAddContact}
								{modalAuth}
								<ChatList
									modalWindow={this.state.modal_window}
									update={this.updateDisplay}
									user={this.state.user}
								/>
								<div
									className="button"
									onClick={this.addContact}
									role="presentation"
								>
									<img src={pencil} alt="create_contact" className="pencil" />
								</div>
								<div height="50px" />
							</div>
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default Messenger;
