import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';
import Navigation from './Navigation';
import AlbumCard from '../templates/AlbumCard';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

const Account = props => {
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

	const classes = useStyles();
	const [albumsComp, setAlbumsComp] = useState();
	const [newAlbum, setNewAlbum] = useState({
		coverImage: '',
		albumName: '',
	});

	const [nameOpen, setNameOpen] = React.useState(false);
	const [imageOpen, setImageOpen] = React.useState(false);

	const handleFromChange = prop => event => {
		setNewAlbum({ ...newAlbum, [prop]: event.target.value });
	};

	const handleClickOpen = id => {
		if (id === 0) {
			setNameOpen(true);
		} else if (id === 1) {
			setImageOpen(true);
		}
	};

	const handleClose = id => {
		if (id === 0) {
			setNameOpen(false);
		} else if (id === 1) {
			setImageOpen(false);
		}
	};

	const handleAlbums = components => {
		setAlbumsComp(components);
	};

	const submitForm = () => {
		//TODO open dialog for image
		handleClose(0);
		props.uploadAlbum(newAlbum);
	};

	return (
		<div>
			<Navigation />
			<Avatar alt='' src={props.user.imageUrl} className={classes.large} />
			<h3>{props.user.name}</h3>
			<h3>{props.user.surname}</h3>

			<div>
				<h2>Albums</h2>
				{albumsComp}
				<Button variant='outlined' color='primary' onClick={handleClickOpen(0)}>
					Create Album
				</Button>
			</div>
			<Dialog
				open={nameOpen}
				onClose={handleClose(0)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Create new album'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Let Google help apps determine location. This means sending
						anonymous location data to Google, even when no apps are running.
					</DialogContentText>
					<form className={classes.root} noValidate autoComplete='off'>
						<TextField
							id='standard-basic'
							label='Name'
							value={newAlbum.albumName}
							onChange={handleFromChange('name')}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose(0)} color='primary'>
						cancel
					</Button>
					<Button onClick={submitForm} color='primary' autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
			{/* TODO add dialog for image */}
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Account));
