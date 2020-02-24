import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import SignIn from './auth/SignIn';
import Loader from './Loader';

const Landing = ({ auth }) => {
	return (
		<div>
			{!auth.isLoaded ? <Loader /> : !auth.isEmpty ? <Home /> : <SignIn />}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.firebaseReducer.auth,
	};
};

export default connect(mapStateToProps)(Landing);
