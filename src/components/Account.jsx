import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';
import Navigation from './Navigation';
import AlbumCard from '../templates/AlbumCard';

import Avatar from '@material-ui/core/Avatar';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	user: state.user,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

const Account = props => {
	const [albumsComp, setAlbumsComp] = useState();
	useEffect(() => {
		if (props.user.albums.length !== 0) {
			let albumsComponents = [];
			props.user.albums.forEach(album => {
				//TODO don't do this make a album prototype
				albumsComponents.push(<AlbumCard album={album} />);
				setAlbumsComp(albumsComponents);
			});
		}
	}, [albumsComp, props.user.albums]);
	return (
		<div>
			<Navigation />
			<Avatar alt='' src={props.user.imageUrl} />
			<h3>{props.user.name}</h3>
			<h3>{props.user.surname}</h3>

			<div>
				<h2>Albums</h2>
				{albumsComp}
				create album
			</div>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Account));
