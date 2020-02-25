import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

export default () => {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(reduxThunk)),
	);
};
