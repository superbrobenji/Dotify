import firebase from '../services/firebase';
import { LOAD_USER, LOADING_ARTIST } from './types';
export const startup = uid => async dispatch => {
	dispatch({ type: LOADING_ARTIST });
	//TODO get account info of user.

	firebase
		.firestore()
		.collection('artists')
		.doc(uid)
		.get()
		.then(doc => {
			const artistImage = doc.data().artist_image;
			dispatch({
				type: LOAD_USER,
				//TODO add all the other userdata here
				payload: { artistImage },
			});
		});
};
