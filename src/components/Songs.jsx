//TODO this is where the songs will be displayed when you click on  an album cover
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import requireAuth from './hoc/requireAuth';
import ReactAudioPlayer from 'react-audio-player';
import Navigation from './Navigation';
import { uploadSong } from '../actions/songs';
import { uploadAlbumImage } from '../actions/albums';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	createdProfile: state.user.createdProfile,
	songs: state.songs,
});

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		width: '325px',
		height: '130px',
		marginTop: '2rem',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	input: {
		display: 'none',
	},
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
					<li key={song.id}>
						<Card className={classes.root}>
							<CardContent>
								<p>{song.songName}</p>
								<ReactAudioPlayer src={song.songUrl} controls />
							</CardContent>
						</Card>
					</li>,
				);
				handleState(songComponents);
			});
		}
	}, [classes.root, props.songs]);

	const handleState = song => {
		setSongComps(song);
	};

	const handleImageChange = async event => {
		const image = event.target.files[0];

		console.log('triggering redux');
		props.uploadAlbumImage(
			image,
			props.location.state.currentAlbum.id,
			props.location.state.uid,
		);
	};

	const handleSongChange = async event => {
		const song = event.target.files[0];

		props.uploadSong(
			song,
			props.location.state.currentAlbum.id,
			props.location.state.uid,
		);
	};

	return (
		<div>
			<Navigation />
			<div>
				<img
					src={props.location.state.currentAlbum.coverImage}
					alt='coverArt'
					style={{ hight: '200px', width: '200px' }}
				/>
			</div>
			{props.location.state.uid === props.location.state.currentAlbum.artist ? (
				<div>
					<input
						accept='image/*'
						className={classes.input}
						id='contained-button-file'
						type='file'
						onChange={handleImageChange}
					/>
					<label htmlFor='contained-button-file'>
						<Button variant='contained' color='primary' component='span'>
							Upload Image
						</Button>
					</label>
				</div>
			) : (
				<div></div>
			)}
			<div>
				<h2>{props.location.state.currentAlbum.albumName}</h2>
			</div>
			<div>
				<p>artist: {props.location.state.currentAlbum.artistName}</p>
				<p>genre: {props.location.state.currentAlbum.genre}</p>{' '}
				<p>Songs: {props.location.state.currentAlbum.songCount}</p>
			</div>
			<hr />
			{props.location.state.uid === props.location.state.currentAlbum.artist ? (
				<div>
					<input
						accept='audio/*'
						className={classes.input}
						id='contained-button-file'
						type='file'
						onChange={handleSongChange}
					/>
					<label htmlFor='contained-button-file'>
						<Button variant='contained' color='primary' component='span'>
							Upload song
						</Button>
					</label>
				</div>
			) : (
				<div></div>
			)}
			<ul>{songComps}</ul>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Songs));
