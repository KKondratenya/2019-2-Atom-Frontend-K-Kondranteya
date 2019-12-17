import { combineReducers } from 'redux';
import message from './messageWork';
import weather from './weatherWork';

const rootReducer = combineReducers({
	message,
	weather,
});

export default rootReducer;
