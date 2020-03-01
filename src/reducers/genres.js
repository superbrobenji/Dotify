import { LOAD_ALL_GENRES, LOAD_ALL_GENRES_ERROR } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case LOAD_ALL_GENRES:
			return { arr: action.payload };
		case LOAD_ALL_GENRES_ERROR:
			return { arr: action.payload };
		default:
			return state;
	}
};
