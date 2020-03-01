//TODO show this when user clicks on artist on the /artist view
import React from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';

import Navigation from './Navigation';
const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	createdProfile: state.user.createdProfile,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

const ArtistAlbums = props => {
	// useEffect(() => {
	// 	if (props.createdProfile === false) history.push('/createaccount');
	// }, [props.createdProfile, history]);

	return (
		<div>
			<Navigation /> this is artist albums
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(ArtistAlbums));
