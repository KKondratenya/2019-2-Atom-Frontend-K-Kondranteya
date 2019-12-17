import ActionTypes from '../constants/ActionWeather';

/* eslint no-param-reassign: 0 */
const initialState = {
	cities: [
		{
			name: 'London',
			main: {
				temp: '7',
			},
		},
		{
			name: 'Moscow',
			main: {
				temp: '6',
			},
		},
	],
	index: 0,
};

export default function message(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_WEATHER:
			return {
				...state,
				cities: action.payload,
			};
		case ActionTypes.SET_CITY:
			return {
				...state,
				index: action.payload,
			};
		default:
			return state;
	}
}
