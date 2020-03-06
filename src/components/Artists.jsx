import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import requireAuth from './hoc/requireAuth';
import ArtistCard from '../templates/ArtistCard';

import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles, theme } from '../MaterialTheme/globalTheme';

import Navigation from './Navigation';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	uid: state.firebaseReducer.auth.uid,
	artists: state.artists,
});

const mapDispatchToProps = dispatch => ({});

const Artists = props => {
	const classes = useStyles();
	useEffect(() => {
		if (props.artists.arr !== undefined) {
			if (props.artists.arr.length !== 0) {
				let artistsComponents = [];
				console.log(props.artists);
				props.artists.arr.forEach(artist => {
					artistsComponents.push(
						<li key={artist.uid} className={classes.albumCard}>
							<ArtistCard artist={artist} uid={props.uid} key={artist.uid} />
						</li>,
					);
					handleartists(artistsComponents);
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.artists, props.uid]);

	const [artistsComp, setartistsComp] = useState();

	const handleartists = components => {
		setartistsComp(components);
	};

	return (
		<ThemeProvider theme={theme}>
			<div>
				<Navigation />{' '}
				<ul className={classes.AccountAlbumList}>{artistsComp} </ul>
			</div>
		</ThemeProvider>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Artists));
