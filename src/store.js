import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash.throttle';

export default () => {
	const persistedState = loadState();

	const store = createStore(
		rootReducer,
		persistedState,
		composeWithDevTools(applyMiddleware(reduxThunk)),
	);

	store.subscribe(
		throttle(() => {
			saveState({
				user: store.getState().user,
				albums: store.getState().albums,
				artists: store.getState().artists,
				genres: store.getState().genres,
				songs: store.getState().songs,
			});
		}, 1000),
	);

	return store;
};
