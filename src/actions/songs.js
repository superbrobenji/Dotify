import {
	LOADING_ARTIST,
	LOADING_FINISH,
	LOAD_SONGS,
	LOAD_SONGS_ERROR,
	UPLOAD_SONG,
	UPLOAD_SONG_ERROR,
} from './types';
import axios from 'axios';
import firebase from '../services/firebase';

export const getAlbumSongs = (uid, currentAlbum) => async dispatch => {
	dispatch({
		type: LOADING_ARTIST,
	});
	console.log(currentAlbum.id);
	axios
		.get(
			'https://us-central1-dotify-eb26e.cloudfunctions.net/api/getalbumsongs',
			{ params: { currentAlbumID: currentAlbum.id } },
		)
		.then(res => {
			console.log(res.data);
			dispatch({ type: LOAD_SONGS, payload: res.data });
			dispatch({
				type: LOADING_FINISH,
			});
		})
		.catch(err => {
			dispatch({
				type: LOADING_FINISH,
			});
			dispatch({ LOAD_SONGS_ERROR });
		});
};

export const uploadSong = (song, currentAlbum, uid) => async dispatch => {
	let songUrl = '';
	dispatch({
		type: LOADING_ARTIST,
	});
	console.log(song, uid);

	const storageRef = firebase.storage().ref();

	const metadata = {
		contentType: song.type,
	};

	storageRef
		.child(`/artist_ ${uid}/albums/album_${currentAlbum}/songs/${song.name}`)
		.put(song, metadata)
		.then(snap => {
			snap.ref.getDownloadURL().then(url => {
				const songName = song.name;
				songUrl = url;
				console.log(url);
				axios
					.post(
						`https://us-central1-dotify-eb26e.cloudfunctions.net/api/uploadsong`,
						{ songUrl, currentAlbum, songName },
					)
					.then(() => {
						reloadSongs(currentAlbum);
						dispatch({
							type: UPLOAD_SONG,
							payload: songUrl,
						});
					})
					.catch(err => {
						console.error(err);
						dispatch({ type: UPLOAD_SONG_ERROR });
					});
			});
		});

	const reloadSongs = currentAlbum => {
		axios
			.get(
				'https://us-central1-dotify-eb26e.cloudfunctions.net/api/getalbumsongs',
				{ params: { currentAlbumID: currentAlbum } },
			)
			.then(res => {
				console.log(res.data);
				dispatch({ type: LOAD_SONGS, payload: res.data });
				dispatch({
					type: LOADING_FINISH,
				});
			})
			.catch(err => {
				dispatch({
					type: LOADING_FINISH,
				});
				dispatch({ LOAD_SONGS_ERROR });
			});
	};
};
