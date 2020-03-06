import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import requireAuth from './hoc/requireAuth';
import AlbumCard from '../templates/AlbumCard';
import Navigation from './Navigation';

import Avatar from '@material-ui/core/Avatar';
import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles, theme } from '../MaterialTheme/globalTheme';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	uid: state.firebaseReducer.auth.uid,
	albums: state.albums,
});

const mapDispatchToProps = dispatch => ({});

const ArtistAlbums = props => {
	const classes = useStyles();

	useEffect(() => {
		if (props.albums.arr !== undefined) {
			if (props.albums.arr.length !== 0) {
				let albumsComponents = [];
				console.log(props.albums);
				let i = 0;
				props.albums.arr.forEach(album => {
					albumsComponents.push(
						<li key={album.id} className={classes.albumCard}>
							<AlbumCard
								album={album}
								albumPos={i}
								uid={props.uid}
								key={album.id}
								userAlbums={false}
							/>
						</li>,
					);
					handleAlbums(albumsComponents);
					i++;
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
			<Navigation />
			<div>
				<div className={classes.accountView}>
					<div className={classes.accountIcon}>
						<Avatar
							style={{ width: '8rem', height: '8rem' }}
							alt=''
							src={props.location.state.currentuser.imageUrl}
						/>
					</div>
					<div className={classes.accountDetails}>
						<h3>{props.location.state.currentuser.artistName}</h3>
						<h3>{props.location.state.currentuser.artistSurname}</h3>
					</div>
				</div>
				<div className={classes.AccountAlbums}>
					<h2>Albums</h2>
					<ul className={classes.AccountAlbumList}>{albumsComp} </ul>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(ArtistAlbums));
