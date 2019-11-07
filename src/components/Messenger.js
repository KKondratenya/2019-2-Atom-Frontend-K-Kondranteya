import React from 'react';
import ChatHead from './ChatHead.js'
import MessageHead from './MessageHead.js'
import FormInput from './FormInput.js'
import List from './MessageContainer.js'
import ChatList from './ChatList'
import pencil from '../assets/images/pencil-edit-button.png'

class Messenger extends React.Component {
	constructor(props) {
		super(props);
		const box = localStorage.getItem('message-container')
		let messageBox = null
		if (box) {
			messageBox = JSON.parse(box)
		} else {
			messageBox = [
				{
					user: 'User',
					messages: []
				}
			]
		}
		this.state = {
			name: messageBox,
			display_chat: {display:'none'},
			display_contact: {display:'block'},
			contact_index: 0
		};
		this.updateValue = this.updateValue.bind(this)
		this.updateDisplay = this.updateDisplay.bind(this)
		this.addContact = this.addContact.bind(this)
	}



		updateValue = (value) => {
			const message = {}
			const date = new Date()
			const Hours = `0${date.getHours()}`.slice(-2)
			const Minutes = `0${date.getMinutes()}`.slice(-2)
			message.inner = value
			message.date = `${Hours}:${Minutes}`
			message.user = 'user'
			const changeState = this.state.name
			changeState[this.state.contact_index].messages.push(message)
			if (this.state.contact_index !== 0) {
				const buf = this.state.name[this.state.contact_index]
				changeState.splice(this.state.contact_index, 1)
				changeState.unshift(buf)
				this.setState({
					contact_index: 0,
				})
			}
			this.setState({
				name: changeState
			})
			const json = JSON.stringify(this.state.name)
			localStorage.setItem('message-container', json)
		}

		updateDisplay = (index) => {
			const displayChat = this.state.display_contact
			const displayContact = this.state.display_chat
			this.setState({
				display_chat:displayChat,
				display_contact:displayContact,
			})
			if (index !== -1) {
				this.setState({
					contact_index: index
				})  
			} 
		}

		addContact = () => {
			const contact = {}
			contact.user = `User ${this.state.name.length}`
			contact.messages = []
			this.setState({name:[...this.state.name, contact]})
			const json = JSON.stringify(this.state.name)
			localStorage.setItem('message-container', json)
		}

		render() {
			return (
				<div className="shopping-list">
					<div className='contact-list' style={this.state.display_contact}>
						<ChatHead/>
						<ChatList name = {this.state.name} update={this.updateDisplay}/>
						<div className='button' onClick={this.addContact} role="presentation">
							<img src={pencil} alt="create_contact"/>
						</div>
					</div>
					<div className='chat' style={this.state.display_chat}>
						<MessageHead update={this.updateDisplay} nick={this.state.name[this.state.contact_index].user}/>
						<List name = {this.state.name[this.state.contact_index].messages}/>
						<FormInput value="Hi" updateValue={this.updateValue}/>
					</div>
				</div>
			);
		}
}

export default Messenger
