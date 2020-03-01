import { LOAD_ALL_ALBUMS } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case LOAD_ALL_ALBUMS:
			return { arr: action.payload };
		default:
			return state;
	}
};
