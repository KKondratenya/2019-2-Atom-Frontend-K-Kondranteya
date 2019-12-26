import ActionTypes from '../constants/ActionMessenger';

/* eslint no-param-reassign: 0 */
/* eslint no-case-declarations: 0 */
const box = localStorage.getItem('box-container');
let messageBox;
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
const initialState = {
	name: messageBox,
	contact_index: 0,
	files: [],
};

export default function message(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.WRITE_MESSAGE:
			const msgs = [
				...state.name[state.contact_index].messages,
				action.payload,
			];
			const newState = { ...state };
			newState.name[state.contact_index].messages = msgs;
			const json = JSON.stringify(state.name);
			localStorage.setItem('box-container', json);
			return newState;
		case ActionTypes.SWITCH_CHAT:
			return {
				...state,
				contact_index: action.payload,
			};
		case ActionTypes.CREATE_CHAT:
			return {
				...state,
				name: [
					...state.name,
					{
						user: `User ${state.name.length}`,
						messages: [],
					},
				],
			};
		case ActionTypes.SEND_FILES:
			return {
				...state,
				files: [...state.files, action.payload],
			};
		default:
			return state;
	}
}
