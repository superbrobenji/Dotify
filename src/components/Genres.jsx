import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';
import GenreCard from '../templates/GenreCard';

import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles, theme } from '../MaterialTheme/globalTheme';

import Navigation from './Navigation';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	genres: state.genres,
	uid: state.firebaseReducer.auth.uid,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

const Genres = props => {
	const classes = useStyles();

	useEffect(() => {
		if (props.genres.arr !== undefined) {
			if (props.genres.arr.length !== 0) {
				let genresComponents = [];
				props.genres.arr.forEach(genre => {
					console.log(genre);
					genresComponents.push(
						<li key={genre} className={classes.albumCard}>
							<GenreCard genre={genre} uid={props.uid} key={genre} />
						</li>,
					);
					handleGenres(genresComponents);
				});
			}
		}
	}, [props.genres, props.uid]);

	const [genresComp, setGenresComp] = useState();

	const handleGenres = components => {
		setGenresComp(components);
	};

	return (
		<ThemeProvider theme={theme}>
			<div>
				<Navigation />
				<ul className={classes.AccountAlbumList}>{genresComp}</ul>
			</div>
		</ThemeProvider>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Genres));
