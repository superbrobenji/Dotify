import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import requireAuth from './hoc/requireAuth';
import AlbumCard from '../templates/AlbumCard';

import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles, theme } from '../MaterialTheme/globalTheme';

import Navigation from './Navigation';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	uid: state.firebaseReducer.auth.uid,
	albums: state.albums,
});

const mapDispatchToProps = dispatch => ({});

const Albums = props => {
	const classes = useStyles();

	useEffect(() => {
		if (props.albums.arr !== undefined) {
			if (props.albums.arr.length !== 0) {
				let albumsComponents = [];
				console.log(props.albums);
				props.albums.arr.forEach(album => {
					albumsComponents.push(
						<li key={album.id} className={classes.albumCard}>
							<AlbumCard album={album} uid={props.uid} key={album.id} />
						</li>,
					);
					handleAlbums(albumsComponents);
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.albums, props.uid]);

	const [albumsComp, setAlbumsComp] = useState();

	const handleAlbums = components => {
		setAlbumsComp(components);
	};

	return (
		<ThemeProvider theme={theme}>
			<div>
				<Navigation />{' '}
				<ul className={classes.AccountAlbumList}>{albumsComp}</ul>
			</div>
		</ThemeProvider>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Albums));
