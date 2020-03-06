import firebase from '../services/firebase';
import { LOAD_USER, LOADING_ARTIST, LOAD_USER_ALBUMS } from './types';
import axios from 'axios';
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
				payload: {
					artistImage,
					accountCreated,
					userName,
					userSurname,
				},
			});
		});
	axios
		.get(
			'https://us-central1-dotify-eb26e.cloudfunctions.net/api/getuseralbums',
			{ params: { uid: uid } },
		)
		.then(res => {
			dispatch({ type: LOAD_USER_ALBUMS, payload: res.data });
		});
};
