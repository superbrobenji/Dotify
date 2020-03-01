import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import requireAuth from './hoc/requireAuth';
import ArtistCard from '../templates/ArtistCard';

import Navigation from './Navigation';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	uid: state.firebaseReducer.auth.uid,
	artists: state.artists,
});

const mapDispatchToProps = dispatch => ({});

const Artists = props => {
	useEffect(() => {
		if (props.artists.arr !== undefined) {
			if (props.artists.arr.length !== 0) {
				let artistsComponents = [];
				console.log(props.artists);
				props.artists.arr.forEach(artist => {
					artistsComponents.push(
						<li key={artist.uid}>
							<ArtistCard artist={artist} uid={props.uid} key={artist.uid} />
						</li>,
					);
					handleartists(artistsComponents);
				});
			}
		}
	}, [props.artists, props.uid]);

	const [artistsComp, setartistsComp] = useState();

	const handleartists = components => {
		setartistsComp(components);
	};

	return (
		<div>
			<Navigation /> {artistsComp}
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Artists));
