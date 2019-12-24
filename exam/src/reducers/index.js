import { combineReducers } from 'redux';
import weather from './weatherWork.js';

const rootReducer = combineReducers({
	weather,
});

export default rootReducer;
