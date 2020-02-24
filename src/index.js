import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import './index.css';
import Home from './components/Home';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
	<Provider store={configureStore()}>
		<Home />
	</Provider>,
	document.getElementById('root'),
);
serviceWorker.unregister();
