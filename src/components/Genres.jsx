import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';
import GenreCard from '../templates/GenreCard';

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
	useEffect(() => {
		if (props.genres.arr !== undefined) {
			if (props.genres.arr.length !== 0) {
				let genresComponents = [];
				props.genres.arr.forEach(genre => {
					console.log(genre);
					genresComponents.push(
						<li key={genre}>
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
		<div>
			<Navigation />
			<ul>{genresComp}</ul>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Genres));
