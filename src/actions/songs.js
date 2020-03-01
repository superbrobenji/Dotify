import {
	LOADING_ARTIST,
	LOADING_FINISH,
	LOAD_SONGS,
	LOAD_SONGS_ERROR,
} from './types';
import axios from 'axios';

export const getAlbumSongs = (uid, currentAlbum) => async dispatch => {
	dispatch({
		type: LOADING_ARTIST,
	});
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
