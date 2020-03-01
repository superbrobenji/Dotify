//TODO this is where the songs will be displayed when you click on  an album cover
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import requireAuth from './hoc/requireAuth';
import ReactAudioPlayer from 'react-audio-player';
import Navigation from './Navigation';
import { uploadSong } from '../actions/songs';

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
		width: '150px',
		height: '80px',
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
	uploadSong: (song, currnetAlbum, uid) =>
		dispatch(uploadSong(song, currnetAlbum, uid)),
});

const Songs = props => {
	const classes = useStyles();
	const [songComps, setSongComps] = useState([]);
	useEffect(() => {
		let songComponents = [];
		props.songs.forEach(song => {
			songComponents.push(
				<li key={song.id}>
					<p>{song.songName}</p>
					<ReactAudioPlayer src={song.songUrl} controls />
				</li>,
			);
			handleState(songComponents);
		});
	}, [props.songs]);

	const handleState = song => {
		setSongComps(song);
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
