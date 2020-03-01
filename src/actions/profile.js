import {
	UPLOAD_IMAGE,
	LOADING_ARTIST,
	UPLOAD_IMAGE_ERROR,
	UPLOAD_USER_ERROR,
	UPLOAD_USER,
} from './types';
import axios from 'axios';
import firebase from '../services/firebase';

export const uploadArtistImage = (image, uid) => async dispatch => {
	let imgurl = '';
	dispatch({
		type: LOADING_ARTIST,
	});
	console.log(image, uid);

	const storageRef = firebase.storage().ref();

	const metadata = {
		contentType: image.type,
	};

	storageRef
		.child(`/artist_ ${uid}/artist_cover/${image.name}`)
		.put(image, metadata)
		.then(snap => {
			snap.ref.getDownloadURL().then(url => {
				imgurl = url;
				console.log(url);
				axios
					.post(
						`https://us-central1-dotify-eb26e.cloudfunctions.net/api/uploadArtistImage`,
						{ imgurl, uid },
					)
					.then(() => {
						dispatch({
							type: UPLOAD_IMAGE,
							payload: imgurl,
						});
					})
					.catch(err => {
						console.error(err);
						dispatch({ type: UPLOAD_IMAGE_ERROR });
					});
			});
		});
};

export const uploadUserData = (userData, callback) => async dispatch => {
	console.log(userData);
	dispatch({
		type: LOADING_ARTIST,
	});

	axios
		.post(
			`https://us-central1-dotify-eb26e.cloudfunctions.net/api/uploadArtist`,
			{ userData },
		)
		.then(() => {
			dispatch({
				type: UPLOAD_USER,
				payload: userData,
			});
			callback();
		})
		.then(() => {})
		.catch(err => {
			console.error(err);
			dispatch({ type: UPLOAD_USER_ERROR });
		});
};
