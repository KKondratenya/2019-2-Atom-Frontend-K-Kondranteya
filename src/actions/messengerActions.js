import ActionMessenger from '../constants/ActionMessenger';
// import store from '../store';

export function switchCh(index) {
	return {
		type: ActionMessenger.SWITCH_CHAT,
		payload: index,
	};
}

export function create(index) {
	return {
		type: ActionMessenger.CREATE_CHAT,
		payload: '1',
	};
}

export function write(value) {
	const newMessage = {};
	const date = new Date();
	const Hours = `0${date.getHours()}`.slice(-2);
	const Minutes = `0${date.getMinutes()}`.slice(-2);
	newMessage.inner = value;
	newMessage.date = `${Hours}:${Minutes}`;
	newMessage.user = 'user';
	newMessage.type = 'text';
	return {
		type: ActionMessenger.WRITE_MESSAGE,
		payload: newMessage,
	};
}

export function send(value, type) {
	const file = {};
	const fileDate = new Date();
	const fileHours = `0${fileDate.getHours()}`.slice(-2);
	const fileMinutes = `0${fileDate.getMinutes()}`.slice(-2);
	file.inner = value;
	file.date = `${fileHours}:${fileMinutes}`;
	file.user = 'user';
	file.type = type;
	return {
		type: ActionMessenger.SEND_FILES,
		payload: file,
	};
}
