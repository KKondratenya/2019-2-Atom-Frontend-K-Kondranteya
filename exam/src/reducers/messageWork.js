import ActionTypes from '../constants/ActionWeather';

/* eslint no-param-reassign: 0 */
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
const initialState = {
	name: messageBox,
	contact_index: 0,
	files: [],
};

let json = null;

export default function message(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.WRITE_MESSAGE:
			state.name[state.contact_index].messages = [
				...state.name[state.contact_index].messages,
				action.payload,
			];
			json = JSON.stringify(state.name);
			localStorage.setItem('box-container', json);
			return { ...state };
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
