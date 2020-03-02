import {
	SIGNUP_SUCCESS,
	LOADING_ARTIST,
	UPLOAD_IMAGE,
	UPLOAD_IMAGE_ERROR,
	LOAD_USER,
	UPLOAD_USER_ERROR,
	UPLOAD_USER,
	SIGNOUT_SUCCESS,
	SIGNUP_ERROR,
	SIGNOUT_ERROR,
	SIGNIN_ERROR,
	LOAD_USER_ALBUMS,
	UPLOAD_ALBUM,
	UPLOAD_ALBUM_ERROR,
	UPLOAD_ALBUM_IMAGE,
	UPLOAD_ALBUM_IMAGE_ERROR,
	LOADING_FINISH,
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case SIGNUP_SUCCESS:
			return {
				...state,
				isLoading: false,
				createdProfile: false,
			};
		case LOAD_USER:
			return {
				...state,
				imageUrl: action.payload.artistImage,
				createdProfile: action.payload.accountCreated,
				name: action.payload.userName,
				surname: action.payload.userSurname,
			};
		case LOAD_USER_ALBUMS:
			console.log(action.payload);
			return {
				...state,
				albums: action.payload,
				isLoading: false,
			};
		case UPLOAD_ALBUM_IMAGE:
			return {
				...state,
				isLoading: false,
			};
		case UPLOAD_ALBUM_IMAGE_ERROR:
			return {
				...state,
				isLoading: false,
			};
		case UPLOAD_IMAGE:
			return {
				...state,
				imageUrl: action.payload,
				isLoading: false,
			};
		case UPLOAD_USER:
			return {
				...state,
				name: action.payload.name,
				surname: action.payload.surname,
				createdProfile: true,
				isLoading: false,
			};
		case UPLOAD_ALBUM:
			return {
				...state,
				albums: action.payload,
				isLoading: false,
			};
		case UPLOAD_IMAGE_ERROR:
			return {
				...state,
				isLoading: false,
			};
		case UPLOAD_USER_ERROR:
			return {
				...state,
				isLoading: false,
			};
		case UPLOAD_ALBUM_ERROR:
			return {
				...state,
				isLoading: false,
			};
		case SIGNIN_ERROR:
			return {
				...state,
				isLoading: false,
			};
		case SIGNUP_ERROR:
			return {
				...state,
				isLoading: false,
			};
		case SIGNOUT_SUCCESS:
			return {
				isLoading: false,
				name: '',
				surname: '',
				imageUrl: '',
				createdProfile: false,
			};
		case LOADING_ARTIST:
			return {
				...state,
				isLoading: true,
			};
		case LOADING_FINISH:
			return {
				...state,
				isLoading: false,
			};
		case SIGNOUT_ERROR:
			return {
				...state,
				isLoading: false,
			};
		default:
			return {
				...state,
			};
	}
};
