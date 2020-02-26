import React from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';

import Loader from './Loader';
import Navigation from './Navigation';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

const Artists = props => {
	return props.isLoaded ? (
		<div>
			<Navigation /> this is Artists
		</div>
	) : (
		<Loader />
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Artists));
