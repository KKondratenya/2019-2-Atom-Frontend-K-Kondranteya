import ActionWeather from '../constants/ActionWeather.js';
import store from '../store';

export function setWeather(data) {
	store.dispatch({
		type: ActionWeather.SET_WEATHER,
		payload: data,
	});
}

export function setCity(data) {
	store.dispatch({
		type: ActionWeather.SET_CITY,
		payload: data,
	});
}
