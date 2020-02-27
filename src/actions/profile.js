import { UPLOAD_IMAGE, LOADING_ARTIST, UPLOAD_IMAGE_ERROR } from './types';
import axios from 'axios';
import firebase from '../services/firebase';

export const uploadArtistImage = (image, uid) => async dispatch => {
	let imgurl = '';
	dispatch({
		type: LOADING_ARTIST,
	});
	console.log(image, uid);

	//TODO save to bucket
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
					.then(() => {})
					.catch(err => {
						console.error(err);
						dispatch({ type: UPLOAD_IMAGE_ERROR });
					});
			});
		});
};
