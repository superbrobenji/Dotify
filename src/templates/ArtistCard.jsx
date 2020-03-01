import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getArtistAlbums } from '../actions/albums';

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
	getArtistAlbums: uid => dispatch(getArtistAlbums(uid)),
});

const ArtistCard = props => {
	const classes = useStyles();
	const history = useHistory();

	const handleCardClick = () => {
		history.push({
			pathname: '/artistalbums',
			state: { uid: props.uid, currentuser: props.artist },
		});
		props.getArtistAlbums(props.artist.uid);
	};
	return (
		<Card className={classes.root} onClick={handleCardClick}>
			<CardContent>
				<div>
					<img
						src={props.artist.imageUrl}
						alt='profile'
						style={{ hight: '200px', width: '200px' }}
					/>
				</div>
				<div>
					<h2>
						{props.artist.artistName} {props.artist.artistSurname}
					</h2>
				</div>
			</CardContent>
		</Card>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistCard);
