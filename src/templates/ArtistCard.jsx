import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getArtistAlbums } from '../actions/albums';

import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles, theme } from '../MaterialTheme/globalTheme';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
		<ThemeProvider theme={theme}>
			<Card className={classes.card} onClick={handleCardClick}>
				<CardContent className={classes.cardContent}>
					<div>
						<img
							src={props.artist.imageUrl}
							alt='profile'
							className={classes.coverImage}
						/>
					</div>
					<div>
						<h2>
							{props.artist.artistName} {props.artist.artistSurname}
						</h2>
					</div>
				</CardContent>
			</Card>
		</ThemeProvider>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistCard);
