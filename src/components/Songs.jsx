//TODO this is where the songs will be displayed when you click on  an album cover
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import requireAuth from './hoc/requireAuth';
import ReactAudioPlayer from 'react-audio-player';
import Navigation from './Navigation';
import { uploadSong } from '../actions/songs';
import { uploadAlbumImage } from '../actions/albums';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles, theme } from '../MaterialTheme/globalTheme';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	createdProfile: state.user.createdProfile,
	songs: state.songs,
	isLoadingImage: state.user.isLoadingImage,
	userAlbums: state.user.albums,
	publicAlbums: state.albums.arr,
});

const mapDispatchToProps = dispatch => ({
	uploadAlbumImage: (image, currnetAlbum, uid) =>
		dispatch(uploadAlbumImage(image, currnetAlbum, uid)),
	uploadSong: (song, currnetAlbum, uid) =>
		dispatch(uploadSong(song, currnetAlbum, uid)),
});

const Songs = props => {
	const classes = useStyles();
	const [songComps, setSongComps] = useState([]);
	useEffect(() => {
		let songComponents = [];
		if (props.songs.length !== 0) {
			props.songs.forEach(song => {
				songComponents.push(
					<li key={song.id} className={classes.albumCard}>
						<Card className={classes.card}>
							<CardContent className={classes.cardContent}>
								<p>{song.songName}</p>
								<ReactAudioPlayer src={song.songUrl} controls />
							</CardContent>
						</Card>
					</li>,
				);
				handleState(songComponents);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classes.root, props.songs]);

	const handleState = song => {
		setSongComps(song);
	};

	const handleImageChange = async event => {
		if (event.target.files[0]) {
			const image = event.target.files[0];
			props.uploadAlbumImage(
				image,
				props.location.state.currentAlbum.id,
				props.location.state.uid,
			);
		}
	};

	const handleSongChange = async event => {
		if (event.target.files[0]) {
			const song = event.target.files[0];

			props.uploadSong(
				song,
				props.location.state.currentAlbum.id,
				props.location.state.uid,
			);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Navigation />
			<div>
				<div className={classes.songAlbumView}>
					<div className={classes.songAlbumIcon}>
						{!props.isLoadingImage ? (
							<img
								className={classes.songAlbumImg}
								src={
									props.location.state.userAlbum
										? props.userAlbums[props.location.state.currentAlbumPos]
												.coverImage
										: props.publicAlbums[props.location.state.currentAlbumPos]
												.coverImage
								}
								alt='coverArt'
							/>
						) : (
							<CircularProgress />
						)}

						{props.location.state.uid ===
						props.location.state.currentAlbum.artist ? (
							<div>
								<input
									accept='image/*'
									className={classes.input}
									id='contained-button-file'
									type='file'
									onChange={handleImageChange}
								/>
								<label htmlFor='contained-button-file'>
									<IconButton color='primary' component='span'>
										<EditIcon />
									</IconButton>
								</label>
							</div>
						) : (
							<div></div>
						)}
						<div className={classes.songAlbumInfo}>
							<div>
								<h2>{props.location.state.currentAlbum.albumName}</h2>
							</div>
							<div>
								<p>artist: {props.location.state.currentAlbum.artistName}</p>
								<p>genre: {props.location.state.currentAlbum.genre}</p>{' '}
								<p>Songs: {props.location.state.currentAlbum.songCount}</p>
							</div>
						</div>
					</div>

					{props.location.state.uid ===
					props.location.state.currentAlbum.artist ? (
						<div>
							<input
								accept='audio/*'
								className={classes.input}
								id='contained-button-audio'
								type='file'
								onChange={handleSongChange}
							/>
							<label htmlFor='contained-button-audio'>
								<Button variant='contained' color='primary' component='span'>
									Upload song
								</Button>
							</label>
						</div>
					) : (
						<div></div>
					)}
					<ul className={classes.AccountAlbumList}>{songComps}</ul>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Songs));
