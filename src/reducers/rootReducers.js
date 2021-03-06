import { combineReducers } from 'redux';
//import dummyReducer from './dummyReducer';

import artistProfile from './artistProfile';
import albums from './albums';
import artists from './artists';
import genres from './genres';
import songs from './songs';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
	firebaseReducer,
	firestoreReducer,
	user: artistProfile,
	albums: albums,
	artists: artists,
	genres: genres,
	songs,
});
