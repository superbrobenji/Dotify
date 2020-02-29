import { LOADING_ARTIST, UPLOAD_ALBUM, UPLOAD_ALBUM_ERROR } from './types';
import axios from 'axios';
import firebase from '../services/firebase';

export const uploadAlbum = albumData => async dispatch => {
	console.log(albumData);
	dispatch({
		type: LOADING_ARTIST,
	});

	axios
		.post(
			`https://us-central1-dotify-eb26e.cloudfunctions.net/api/uploadalbum`,
			{ albumData },
		)
		.then(res => {
			dispatch({
				type: UPLOAD_ALBUM,
				payload: res.data,
			});
		})
		.catch(err => {
			console.error(err);
			dispatch({ type: UPLOAD_ALBUM_ERROR });
		});
};
