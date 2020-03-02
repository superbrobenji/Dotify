import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import SignIn from './auth/SignIn';
import Loader from './Loader';
import { startup } from '../actions/startup';
import CreateAccount from './CreateAccount';

const Landing = ({
	isLoaded,
	isEmpty,
	uid,
	startup,
	isLoading,
	createdProfile,
}) => {
	useEffect(() => {
		if (!isEmpty) {
			//TODO everything that needs to be pulled in on website start.
			startup(uid);
		}
	}, [startup, isEmpty, uid]);
	return (
		<div>
			{!isLoaded ? (
				<Loader />
			) : !isEmpty && !isLoading ? (
				createdProfile ? (
					<Home />
				) : (
					<CreateAccount />
				)
			) : (
				<SignIn />
			)}
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	startup: uid => dispatch(startup(uid)),
});

const mapStateToProps = state => {
	return {
		isLoaded: state.firebaseReducer.auth.isLoaded,
		isEmpty: state.firebaseReducer.auth.isEmpty,
		uid: state.firebaseReducer.auth.uid,
		isLoading: state.user.isLoading,
		createdProfile: state.user.createdProfile,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
