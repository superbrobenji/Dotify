import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createReduxStore from './store';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import firebase from './services/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

const rrfConfig = { userProfile: 'users' };

const store = createReduxStore();

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	// createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<App />
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root'),
);
serviceWorker.unregister();
