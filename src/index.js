import React from 'react';
import { render } from 'react-dom';
import './styles/globalStyles.css';
import * as serviceWorker from './utils/serviceWorker';
import ShoppingList from './components/Messenger.js'

render(
	<ShoppingList>
		hello	
	</ShoppingList>,
	document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
