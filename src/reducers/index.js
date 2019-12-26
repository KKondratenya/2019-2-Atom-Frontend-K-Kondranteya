import { combineReducers } from 'redux';
import message from './messageWork';

const rootReducer = combineReducers({
	message,
});

export default rootReducer;
