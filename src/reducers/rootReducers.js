import { combineReducers } from 'redux';
//import dummyReducer from './dummyReducer';

import artistProfile from './artistProfile';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
	firebaseReducer,
	firestoreReducer,
	user: artistProfile,
});
