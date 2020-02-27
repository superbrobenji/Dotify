import {
	SIGNUP_SUCCESS,
	LOADING_ARTIST,
	UPLOAD_IMAGE,
	UPLOAD_IMAGE_ERROR,
	LOAD_USER,
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case SIGNUP_SUCCESS:
			return {
				...state,

				createdProfile: false,
			};
		case LOAD_USER:
			return {
				...state,
				imageUrl: action.payload.artistImage,
				isLoading: false,
			};
		case UPLOAD_IMAGE:
			return {
				...state,
				imageUrl: action.payload,
				isLoading: false,
			};
		case UPLOAD_IMAGE_ERROR:
			return {
				...state,
			};
		case LOADING_ARTIST:
			return {
				...state,
				isLoading: true,
			};

		default:
			return {
				...state,
			};
	}
};
