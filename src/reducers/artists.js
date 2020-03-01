import { LOAD_ALL_ARTISTS } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case LOAD_ALL_ARTISTS:
			return { arr: action.payload };
		default:
			return state;
	}
};
