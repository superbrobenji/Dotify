import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGenreAlbums } from '../actions/albums';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	createdProfile: state.user.createdProfile,
});

const mapDispatchToProps = dispatch => ({
	getGenreAlbums: uid => dispatch(getGenreAlbums(uid)),
});

const GenreCard = props => {
	const classes = useStyles();
	const history = useHistory();

	const handleCardClick = () => {
		history.push({
			pathname: '/albums',
		});
		//TODO run dispatch that gets albums of this user
		props.getGenreAlbums(props.genre);
	};
	return (
		<Card className={classes.root} onClick={handleCardClick}>
			<CardContent>
				<div>
					<h2>{props.genre}</h2>
				</div>
			</CardContent>
		</Card>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(GenreCard);
