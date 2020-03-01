//TODO this is where the songs will be displayed when you click on  an album cover
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSongs } from '../actions/albums';
import requireAuth from './hoc/requireAuth';

import Navigation from './Navigation';
const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	createdProfile: state.user.createdProfile,
});

const mapDispatchToProps = dispatch => ({
	getSongs: (uid, currentAlbum) => dispatch(getSongs(uid, currentAlbum)),
});

const Songs = props => {
	useEffect(() => {
		getSongs(props.location.state.uid, props.location.state.currentAlbum);
	}, [props.location.state.currentAlbum, props.location.state.uid]);

	return (
		<div>
			<Navigation /> this is songs
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Songs));
