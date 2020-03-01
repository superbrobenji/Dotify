//TODO this is where the songs will be displayed when you click on  an album cover
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import requireAuth from './hoc/requireAuth';
import ReactAudioPlayer from 'react-audio-player';

import Navigation from './Navigation';
const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	createdProfile: state.user.createdProfile,
	songs: state.songs,
});

const mapDispatchToProps = dispatch => ({});

const Songs = props => {
	const [songComps, setSongComps] = useState([]);
	useEffect(() => {
		props.songs.forEach(song => {
			handleState(song);
		});
	}, [props.songs]);

	const handleState = song => {
		setSongComps(
			<li key={song.id}>
				<p>{song.songName}</p>
				<ReactAudioPlayer src={song.songUrl} controls />
			</li>,
		);
	};
	return (
		<div>
			<Navigation />
			<ul>{songComps}</ul>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Songs));
