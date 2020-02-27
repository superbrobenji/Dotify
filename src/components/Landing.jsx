import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import SignIn from './auth/SignIn';
import Loader from './Loader';
import { startup } from '../actions/startup';

const Landing = ({ isLoaded, isEmpty, uid, startup, isLoading }) => {
	useEffect(() => {
		if (!isEmpty) {
			//TODO everything that needs to be pulled in on website start.
			startup(uid);
		}
	}, [startup, isEmpty, uid]);
	return (
		<div>
			{!isLoaded && isLoading ? <Loader /> : !isEmpty ? <Home /> : <SignIn />}
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
