import ActionTypes from '../constants/ActionWeather.js';

/* eslint no-param-reassign: 0 */
const initialState = {
	cities: [],
	index: 0,
	iconWeather: {
		Clear: '01d',
		Clouds: '02d',
		Rain: '10d',
		Thunderstorm: '11d',
		Snow: '13d',
		Mist: '50d',
		Fog: '50d',
	},
};

export default function message(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_WEATHER:
			return {
				...state,
				cities: [...action.payload],
			};
		case ActionTypes.SET_CITY:
			return {
				...state,
				index: action.payload,
			};
		case ActionTypes.ADD_CITY:
			return {
				...state,
				cities: [action.payload, ...state.cities],
			};
		default:
			return state;
	}
}
