import React from 'react';
import { connect } from 'react-redux';
import { getAlbumSongs } from '../actions/songs';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		width: '200px',
		height: '400px',
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
		<Card className={classes.root} onClick={handleCardClick}>
			<CardContent>
				<div>
					<img
						src={props.album.coverImage}
						alt='coverArt'
						style={{ hight: '200px', width: '200px' }}
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
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCard);
