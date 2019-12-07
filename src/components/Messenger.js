import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createChat } from '../actions/messengerActions';
import ChatHead from './ChatHead.js';
import ProfileHead from './ProfileHead.js';
import ProfileEdit from './ProfileEdit.js';
import MessageHead from './MessageHead.js';
import FormInput from './FormInput.js';
import List from './MessageContainer.js';
import ChatList from './ChatList';
import pencil from '../assets/images/pencil-edit-button.png';

/* eslint react/destructuring-assignment: 0 */
function Messenger() {
	return (
		<Router>
			<div className="messenger">
				<Switch>
					<Route path="/chat">
						<div className="chat">
							<MessageHead />
							<List />
							<FormInput />
						</div>
					</Route>
					<Route path="/profile">
						<ProfileHead />
						<ProfileEdit />
					</Route>
					<Route path="/">
						<div className="contact-list">
							<ChatHead />
							<ChatList />
							<div className="button" onClick={createChat} role="presentation">
								<img src={pencil} alt="create_contact" className="pencil" />
							</div>
						</div>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default connect(null)(Messenger);
