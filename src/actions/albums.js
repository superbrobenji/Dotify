import {
	LOADING_ARTIST,
	UPLOAD_ALBUM,
	UPLOAD_ALBUM_ERROR,
	UPLOAD_ALBUM_IMAGE,
	UPLOAD_ALBUM_IMAGE_ERROR,
	LOAD_USER_ALBUMS,
} from './types';
import axios from 'axios';
import firebase from '../services/firebase';

export const uploadAlbum = (albumData, albums) => async dispatch => {
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
			const disp = [...albums, res.data];
			dispatch({
				type: UPLOAD_ALBUM,
				payload: disp,
			});
		})
		.catch(err => {
			console.error(err);
			dispatch({ type: UPLOAD_ALBUM_ERROR });
		});
};

export const uploadAlbumImage = (
	image,
	currentAlbum,
	uid,
) => async dispatch => {
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
		.child(
			`/artist_ ${uid}/albums/album_${currentAlbum}/album_cover/${image.name}`,
		)
		.put(image, metadata)
		.then(snap => {
			snap.ref.getDownloadURL().then(url => {
				imgurl = url;
				console.log(url);
				axios
					.post(
						`https://us-central1-dotify-eb26e.cloudfunctions.net/api/uploadAlbumImage`,
						{ imgurl, currentAlbum, uid },
					)
					.then(() => {
						reloadAlbums(uid);
						dispatch({
							type: UPLOAD_ALBUM_IMAGE,
							payload: imgurl,
						});
					})
					.catch(err => {
						console.error(err);
						dispatch({ type: UPLOAD_ALBUM_IMAGE_ERROR });
					});
			});
		});

	const reloadAlbums = uid => {
		axios
			.get(
				'https://us-central1-dotify-eb26e.cloudfunctions.net/api/getuseralbums',
				{ params: { uid: uid } },
			)
			.then(res => {
				console.log(res.data);
				dispatch({ type: LOAD_USER_ALBUMS, payload: res.data });
			});
	};
};
