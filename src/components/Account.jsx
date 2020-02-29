import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';
import Navigation from './Navigation';
import AlbumCard from '../templates/AlbumCard';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	large: {
		width: theme.spacing(20),
		height: theme.spacing(20),
	},
}));

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	user: state.user,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

const Account = props => {
	const classes = useStyles();

	const handleAlbums = components => {
		setAlbumsComp(components);
	};

	const [albumsComp, setAlbumsComp] = useState();
	useEffect(() => {
		if (props.user.albums.length !== 0) {
			let albumsComponents = [];
			props.user.albums.forEach(album => {
				//TODO don't do this make a album prototype
				albumsComponents.push(<AlbumCard album={album} key={album.id} />);
				handleAlbums(albumsComponents);
			});
		}
	}, [props.user.albums]);
	return (
		<div>
			<Navigation />
			<Avatar alt='' src={props.user.imageUrl} className={classes.large} />
			<h3>{props.user.name}</h3>
			<h3>{props.user.surname}</h3>

			<div>
				<h2>Albums</h2>
				{albumsComp}
				create album
			</div>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Account));
