import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import requireAuth from './hoc/requireAuth';
import AlbumCard from '../templates/AlbumCard';

import Navigation from './Navigation';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	uid: state.firebaseReducer.auth.uid,
	albums: state.albums,
});

const mapDispatchToProps = dispatch => ({});

const Albums = props => {
	useEffect(() => {
		if (props.albums.arr !== undefined) {
			if (props.albums.arr.length !== 0) {
				let albumsComponents = [];
				console.log(props.albums);
				props.albums.arr.forEach(album => {
					albumsComponents.push(
						<li key={album.id}>
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
			<Navigation /> {albumsComp}
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Albums));
