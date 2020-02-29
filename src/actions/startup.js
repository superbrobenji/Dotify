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
			const data = doc.data();
			const accountCreated = data.account_created;
			const artistImage = data.artist_image;
			let userName = '';
			let userSurname = '';
			if (accountCreated) {
				userName = data.artist_name;
				userSurname = data.artist_surname;
			}
			dispatch({
				type: LOAD_USER,
				//TODO add all the other userdata here
				payload: { artistImage, accountCreated, userName, userSurname },
			});
		});
};
