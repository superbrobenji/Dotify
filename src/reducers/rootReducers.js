import { combineReducers } from 'redux';
//import dummyReducer from './dummyReducer';

import authReducer from './auth';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
	firebaseReducer,
	authReducer,
});
