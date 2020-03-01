import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import requireAuth from './hoc/requireAuth';
import AlbumCard from '../templates/AlbumCard';
import Navigation from './Navigation';

import Avatar from '@material-ui/core/Avatar';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	uid: state.firebaseReducer.auth.uid,
	albums: state.albums,
});

const mapDispatchToProps = dispatch => ({});

const ArtistAlbums = props => {
	console.log(props.location.state.currentuser);
	useEffect(() => {
		if (props.albums.arr !== undefined) {
			if (props.albums.arr.length !== 0) {
				let albumsComponents = [];
				console.log(props.albums);
				props.albums.arr.forEach(album => {
					albumsComponents.push(
						<li>
							<AlbumCard album={album} uid={props.uid} key={album.id} />
						</li>,
					);
					handleAlbums(albumsComponents);
				});
			}
		}
	}, [props.albums, props.uid]);

	const [albumsComp, setAlbumsComp] = useState();

	const handleAlbums = components => {
		setAlbumsComp(components);
	};

	return (
		<div>
			<Navigation />
			<div>
				<Avatar alt='' src={props.location.state.currentuser.imageUrl} />
				<h3>{props.location.state.currentuser.artistName}</h3>
				<h3>{props.location.state.currentuser.artistSurname}</h3>
			</div>
			<h2>Albums</h2>
			{albumsComp}
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(ArtistAlbums));
