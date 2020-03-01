import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { uploadAlbum } from '../actions/albums';
import requireAuth from './hoc/requireAuth';
import Navigation from './Navigation';
import AlbumCard from '../templates/AlbumCard';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

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
	uid: state.firebaseReducer.auth.uid,
});

const mapDispatchToProps = dispatch => ({
	uploadAlbum: (albumData, albums) => dispatch(uploadAlbum(albumData, albums)),
});

const Account = props => {
	useEffect(() => {
		if (props.user.albums.length !== 0) {
			let albumsComponents = [];
			props.user.albums.forEach(album => {
				albumsComponents.push(
					<li>
						<AlbumCard album={album} uid={props.uid} key={album.id} />
					</li>,
				);
				handleAlbums(albumsComponents);
			});
		}
	}, [props.uid, props.user.albums]);

	const classes = useStyles();
	const [albumsComp, setAlbumsComp] = useState();
	const [newAlbum, setNewAlbum] = useState({
		albumName: '',
		artist: props.uid,
		genre: '',
		artistName: props.user.name,
	});

	const [nameOpen, setNameOpen] = useState(false);
	const [currnetAlbum, setCurrentAlbum] = useState({
		id: props.user.albums[props.user.albums.length - 1].id,
		arrPos: props.user.albums.length - 1,
	});
	console.log(props.user.albums[currnetAlbum.arrPos]);
	const handleFromChange = prop => event => {
		setNewAlbum({ ...newAlbum, [prop]: event.target.value });
	};

	const handleClickOpenName = id => {
		setNameOpen(true);
	};

	const handleCloseName = () => {
		setNameOpen(false);
	};

	const handleAlbums = components => {
		setAlbumsComp(components);
	};

	const submitForm = () => {
		handleCloseName();
		props.uploadAlbum(newAlbum, props.user.albums);
		const current = props.user.albums[props.user.albums.length - 1];
		setCurrentAlbum({ ...currnetAlbum, id: current.id });
	};

	return (
		<div>
			<Navigation />
			<Avatar alt='' src={props.user.imageUrl} className={classes.large} />
			<h3>{props.user.name}</h3>
			<h3>{props.user.surname}</h3>

			<div>
				<h2>Albums</h2>
				<Button
					variant='contained'
					color='primary'
					onClick={handleClickOpenName}
				>
					Create Album
				</Button>
				<ul>{albumsComp}</ul>
			</div>
			<Dialog
				open={nameOpen}
				onClose={handleCloseName}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='name-dialog-title'>{'Create new album'}</DialogTitle>
				<DialogContent>
					<form className={classes.root} noValidate autoComplete='off'>
						<TextField
							id='standard-basic'
							label='Album name'
							value={newAlbum.albumName}
							onChange={handleFromChange('albumName')}
						/>
						{/* //TODO redo this to select from available genres */}
						<TextField
							id='standard-basic'
							label='genre'
							value={newAlbum.genre}
							onChange={handleFromChange('genre')}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseName} color='primary'>
						cancel
					</Button>
					<Button onClick={submitForm} color='primary' autoFocus>
						create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Account));
