import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { uploadAlbum } from '../actions/albums';
import requireAuth from './hoc/requireAuth';
import Navigation from './Navigation';
import AlbumCard from '../templates/AlbumCard';

import Avatar from '@material-ui/core/Avatar';
import { useStyles, theme } from '../MaterialTheme/globalTheme';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/core/styles';

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
			let i = 0;
			props.user.albums.forEach(album => {
				albumsComponents.push(
					<li key={album.id} className={classes.albumCard}>
						<AlbumCard
							album={album}
							albumPos={i}
							uid={props.uid}
							key={album.id}
							userAlbums={true}
						/>
					</li>,
				);
				handleAlbums(albumsComponents);
				i++;
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
	};

	return (
		<ThemeProvider theme={theme}>
			<Navigation />
			<div>
				<div className={classes.accountView}>
					<div className={classes.accountIcon}>
						<Avatar
							alt=''
							src={props.user.imageUrl}
							style={{ width: '8rem', height: '8rem' }}
						/>
					</div>
					<div className={classes.accountDetails}>
						<h3>{props.user.name}</h3>
						<h3>{props.user.surname}</h3>
					</div>
				</div>
				<div className={classes.AccountAlbums}>
					<h2>Albums</h2>
					<Button
						variant='contained'
						color='primary'
						onClick={handleClickOpenName}
					>
						Create Album
					</Button>
					<div>
						<ul className={classes.AccountAlbumList}>{albumsComp}</ul>
					</div>
				</div>
				<Dialog
					open={nameOpen}
					onClose={handleCloseName}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogTitle id='name-dialog-title'>{'Create new album'}</DialogTitle>
					<DialogContent>
						<form className={classes.cardContent} noValidate autoComplete='off'>
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
		</ThemeProvider>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Account));
