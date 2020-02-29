import React from 'react';
import { connect } from 'react-redux';
import { uploadAlbumImage } from '../actions/albums';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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
	uploadAlbumImage: (image, currnetAlbum, uid) =>
		dispatch(uploadAlbumImage(image, currnetAlbum, uid)),
});

const AlbumCard = props => {
	const classes = useStyles();

	const handleImageChange = async event => {
		const image = event.target.files[0];

		console.log('triggering redux');
		props.uploadAlbumImage(image, props.album.id, props.uid);
	};
	return (
		<Card className={classes.root}>
			<CardContent>
				<div>
					<img
						src={props.album.coverImage}
						alt='coverArt'
						style={{ hight: '200px', width: '200px' }}
					/>
				</div>
				{props.uid === props.album.artist ? (
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
					<h2>{props.album.albumName}</h2>
				</div>
				<div>
					<p>genre: {props.album.genre}</p>{' '}
					<p>Songs: {props.album.songCount}</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCard);
