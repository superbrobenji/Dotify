import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';
import { useHistory } from 'react-router-dom';

import Loader from './Loader';
import Navigation from './Navigation';
const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	createdProfile: state.user.createdProfile,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

const Home = props => {
	const history = useHistory();

	useEffect(() => {
		if (!props.createdProfile) history.push('/createaccount');
	}, [props.createdProfile, history]);

	return props.isLoaded ? (
		<div>
			<Navigation /> this is Home
		</div>
	) : (
		<Loader />
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Home));
