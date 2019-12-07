import ActionMessenger from '../constants/ActionMessenger';
import store from '../store';

export function switchChat(index) {
	store.dispatch({
		type: ActionMessenger.SWITCH_CHAT,
		payload: index,
	});
}

export function createChat() {
	store.dispatch({
		type: ActionMessenger.CREATE_CHAT,
	});
}

export function writeMessage(value) {
	const newMessage = {};
	const date = new Date();
	const Hours = `0${date.getHours()}`.slice(-2);
	const Minutes = `0${date.getMinutes()}`.slice(-2);
	newMessage.inner = value;
	newMessage.date = `${Hours}:${Minutes}`;
	newMessage.user = 'user';
	newMessage.type = 'text';
	store.dispatch({
		type: ActionMessenger.WRITE_MESSAGE,
		payload: newMessage,
	});
}

export function sendFiles(value, type) {
	const file = {};
	const fileDate = new Date();
	const fileHours = `0${fileDate.getHours()}`.slice(-2);
	const fileMinutes = `0${fileDate.getMinutes()}`.slice(-2);
	file.inner = value;
	file.date = `${fileHours}:${fileMinutes}`;
	file.user = 'user';
	file.type = type;
	store.dispatch({
		type: ActionMessenger.SEND_FILES,
		payload: file,
	});
}
