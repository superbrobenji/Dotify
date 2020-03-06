import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGenreAlbums } from '../actions/albums';

import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles, theme } from '../MaterialTheme/globalTheme';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
		<ThemeProvider theme={theme}>
			<Card className={classes.genreCard} onClick={handleCardClick}>
				<CardContent className={classes.cardContent}>
					<div>
						<h2>{props.genre}</h2>
					</div>
				</CardContent>
			</Card>
		</ThemeProvider>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(GenreCard);
