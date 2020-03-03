import {
	LOADING_ARTIST,
	UPLOAD_ALBUM,
	UPLOAD_ALBUM_ERROR,
	UPLOAD_ALBUM_IMAGE,
	UPLOAD_ALBUM_IMAGE_ERROR,
	LOAD_USER_ALBUMS,
	LOAD_ALL_ALBUMS,
	LOAD_ALL_ALBUMS_ERROR,
	LOADING_FINISH,
	LOAD_ARTIST_ALBUMS,
	LOAD_ARTIST_ALBUMS_ERROR,
	LOAD_GENRE_ALBUMS,
	LOAD_GENRE_ALBUMS_ERROR,
	LOADING_IMAGE,
} from './types';
import axios from 'axios';
import firebase from '../services/firebase';

export const getGenreAlbums = genre => async dispatch => {
	dispatch({
		type: LOADING_ARTIST,
	});
	axios
		.get(
			'https://us-central1-dotify-eb26e.cloudfunctions.net/api/getgenrealbums',
			{ params: { genre: genre } },
		)
		.then(res => {
			console.log(res.data);
			dispatch({ type: LOAD_GENRE_ALBUMS, payload: res.data });
			dispatch({
				type: LOADING_FINISH,
			});
		})
		.catch(err => {
			dispatch({
				type: LOADING_FINISH,
			});
			dispatch({ LOAD_GENRE_ALBUMS_ERROR });
		});
};

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
		type: LOADING_IMAGE,
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

export const getAllAlbums = () => async dispatch => {
	dispatch({
		type: LOADING_ARTIST,
	});
	axios
		.get('https://us-central1-dotify-eb26e.cloudfunctions.net/api/getallalbums')
		.then(res => {
			console.log(res.data);
			dispatch({ type: LOAD_ALL_ALBUMS, payload: [...res.data] });
			dispatch({
				type: LOADING_FINISH,
			});
		})
		.catch(err => dispatch({ type: LOAD_ALL_ALBUMS_ERROR, payload: err }));
};

export const getArtistAlbums = uid => async dispatch => {
	dispatch({
		type: LOADING_ARTIST,
	});
	axios
		.get(
			'https://us-central1-dotify-eb26e.cloudfunctions.net/api/getuseralbums',
			{ params: { uid: uid } },
		)
		.then(res => {
			console.log(res.data);
			dispatch({ type: LOAD_ARTIST_ALBUMS, payload: res.data });
			dispatch({
				type: LOADING_FINISH,
			});
		})
		.catch(err => {
			dispatch({
				type: LOADING_FINISH,
			});
			dispatch({ LOAD_ARTIST_ALBUMS_ERROR });
		});
};
