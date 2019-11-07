import React from 'react';
import { render } from 'react-dom';
import './styles/globalStyles.css';

import Messenger from './components/Messenger.js';

render(<Messenger>hello</Messenger>, document.getElementById('root'));
