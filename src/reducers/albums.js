import { LOAD_ALL_ALBUMS, LOAD_ARTIST_ALBUMS } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case LOAD_ALL_ALBUMS:
			return { arr: action.payload };
		case LOAD_ARTIST_ALBUMS:
			return { arr: action.payload };
		default:
			return state;
	}
};
