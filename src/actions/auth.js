import {
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
	SIGNIN_SUCCESS,
	SIGNIN_ERROR,
	SIGNOUT_SUCCESS,
	SIGNOUT_ERROR,
	RESET_SUCCESS,
	RESET_ERROR,
} from './types';
import firebase from '../services/firebase';

export const signup = (email, password) => async dispatch => {
	try {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(dataBeforeEmail => {
				firebase.auth().onAuthStateChanged(function(user) {
					user.sendEmailVerification();
				});
			})
			.then(dataAfterEmail => {
				dispatch({
					type: SIGNUP_SUCCESS,
					payload:
						'Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox.',
				});
			});
	} catch (err) {
		dispatch({
			type: SIGNUP_ERROR,
			payload:
				"Something went wrong, we couldn't create your account. Please try again.",
		});
	}
};

export const signin = (email, password, callback) => async dispatch => {
	try {
		console.log(email + ' - ' + password);
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				dispatch({ type: SIGNIN_SUCCESS });
				callback();
			})
			.catch(() => {
				dispatch({
					type: SIGNIN_ERROR,
					payload: 'Invalid login credentials',
				});
			});
	} catch (err) {
		dispatch({ type: SIGNIN_ERROR, payload: 'Invalid login credentials' });
	}
};

export const signout = () => async dispatch => {
	try {
		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: SIGNOUT_SUCCESS });
			})
			.catch(() => {
				dispatch({
					type: SIGNOUT_ERROR,
					payload: '...some error message for the user...',
				});
			});
	} catch (err) {
		dispatch({
			type: SIGNOUT_ERROR,
			payload: '...some error message for the user...',
		});
	}
};

export const resetPassword = email => async dispatch => {
	try {
		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(() =>
				dispatch({
					type: RESET_SUCCESS,
					payload: 'Reset email sent. Go check your inbox.',
				}),
			)
			.catch(err => {
				dispatch({
					type: RESET_ERROR,
					payload: '...some message for the user...',
				});
			});
	} catch (err) {
		dispatch({
			type: RESET_ERROR,
			payload: '...some message for the user...',
		});
	}
};
