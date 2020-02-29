import React from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
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
});

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	createdProfile: state.user.createdProfile,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

const AlbumCard = props => {
	const classes = useStyles();
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
