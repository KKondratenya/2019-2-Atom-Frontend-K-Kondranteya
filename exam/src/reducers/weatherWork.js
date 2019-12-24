import ActionTypes from '../constants/ActionWeather.js';

/* eslint no-param-reassign: 0 */
const initialState = {
	cities: [],
	index: 0,
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
		default:
			return state;
	}
}
