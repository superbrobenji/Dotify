import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import SignIn from './auth/SignIn';
import Loader from './Loader';

const Landing = ({ isLoaded, isEmpty }) => {
	return <div>{!isLoaded ? <Loader /> : !isEmpty ? <Home /> : <SignIn />}</div>;
};

const mapStateToProps = state => {
	return {
		isLoaded: state.firebaseReducer.auth.isLoaded,
		isEmpty: state.firebaseReducer.auth.isEmpty,
	};
};

export default connect(mapStateToProps)(Landing);
