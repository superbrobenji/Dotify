import {
	LOAD_ALL_ARTISTS,
	LOADING_ARTIST,
	LOADING_FINISH,
	LOAD_ALL_ARTISTS_ERROR,
} from './types';
import axios from 'axios';

export const getAllArtists = () => async dispatch => {
	dispatch({
		type: LOADING_ARTIST,
	});
	axios
		.get(
			'https://us-central1-dotify-eb26e.cloudfunctions.net/api/getallartists',
		)
		.then(res => {
			console.log(res.data);
			dispatch({ type: LOAD_ALL_ARTISTS, payload: [...res.data] });
			dispatch({
				type: LOADING_FINISH,
			});
		})
		.catch(err => {
			dispatch({
				type: LOADING_FINISH,
			});
			dispatch({ type: LOAD_ALL_ARTISTS_ERROR, payload: err });
		});
};
