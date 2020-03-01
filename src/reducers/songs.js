import { LOAD_SONGS } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case LOAD_SONGS:
			return action.payload;
		default:
			return state;
	}
};
