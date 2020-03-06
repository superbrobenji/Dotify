import React from 'react';
import { connect } from 'react-redux';
import { getAlbumSongs } from '../actions/songs';
import { useHistory } from 'react-router-dom';

import { useStyles, theme } from '../MaterialTheme/globalTheme';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ThemeProvider } from '@material-ui/core/styles';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	createdProfile: state.user.createdProfile,
});

const mapDispatchToProps = dispatch => ({
	getAlbumSongs: (uid, currentAlbum) =>
		dispatch(getAlbumSongs(uid, currentAlbum)),
});

const AlbumCard = props => {
	const classes = useStyles();
	const history = useHistory();

	const handleCardClick = () => {
		history.push({
			pathname: '/songs',
			state: {
				uid: props.uid,
				currentAlbum: props.album,
				currentAlbumPos: props.albumPos,
				userAlbum: props.userAlbums,
			},
		});
		props.getAlbumSongs(props.uid, props.album);
	};
	return (
		<ThemeProvider theme={theme}>
			<Card className={classes.templateCards} onClick={handleCardClick}>
				<CardContent className={classes.cardContent}>
					<div>
						<img
							src={props.album.coverImage}
							alt='coverArt'
							className={classes.coverImage}
						/>
					</div>

					<div>
						<h2>{props.album.albumName}</h2>
					</div>
					<div>
						<p>artist: {props.album.artistName}</p>
						<p>genre: {props.album.genre}</p>{' '}
						<p>Songs: {props.album.songCount}</p>
					</div>
				</CardContent>
			</Card>
		</ThemeProvider>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCard);
