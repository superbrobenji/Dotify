import {
	LOAD_ALL_GENRES_ERROR,
	LOADING_ARTIST,
	LOADING_FINISH,
	LOAD_ALL_GENRES,
} from './types';
import axios from 'axios';

export const getAllGenres = () => async dispatch => {
	dispatch({
		type: LOADING_ARTIST,
	});
	axios
		.get('https://us-central1-dotify-eb26e.cloudfunctions.net/api/getallgenres')
		.then(res => {
			dispatch({ type: LOAD_ALL_GENRES, payload: res.data });
			dispatch({
				type: LOADING_FINISH,
			});
		})
		.catch(err => {
			dispatch({
				type: LOADING_FINISH,
			});
			dispatch({ type: LOAD_ALL_GENRES_ERROR });
		});
};
