import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './styles/globalStyles.css';
import store from './store';
import Messenger from './components/Messenger.js';

render(
	<Provider store={store}>
		<Messenger />
	</Provider>,
	document.getElementById('root'),
);
