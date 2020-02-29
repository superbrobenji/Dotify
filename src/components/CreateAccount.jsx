import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploadArtistImage, uploadUserData } from '../actions/profile';
import requireAuth from './hoc/requireAuth';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import Loader from './Loader';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: 'none',
	},
}));

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	imageUrl: state.user.imageUrl,
	uid: state.firebaseReducer.auth.uid,
	isloading: state.user.isLoading,
});

const mapDispatchToProps = dispatch => ({
	uploadArtistImage: (image, uid) => dispatch(uploadArtistImage(image, uid)),
	uploadUserData: (userData, callback) =>
		dispatch(uploadUserData(userData, callback)),
});

const CreateAccount = props => {
	const history = useHistory();
	const [user, setUser] = useState({ name: '', surname: '', uid: props.uid });
	const classes = useStyles();

	const handleFromChange = prop => event => {
		setUser({ ...user, [prop]: event.target.value });
	};

	const submitForm = () => {
		props.uploadUserData(user, () => history.push('/home'));
	};

	const handleImageChange = async event => {
		const image = event.target.files[0];

		console.log('triggering redux');
		props.uploadArtistImage(image, props.uid);
	};
	return props.isLoaded ? (
		<div className={classes.root}>
			{props.isLoading ? <Loader /> : <Avatar alt='' src={props.imageUrl} />}
			<input
				accept='image/*'
				className={classes.input}
				id='contained-button-file'
				type='file'
				onChange={handleImageChange}
			/>
			<label htmlFor='contained-button-file'>
				<Button variant='contained' color='primary' component='span'>
					Upload
				</Button>
			</label>
			<form className={classes.root} noValidate autoComplete='off'>
				<TextField
					id='standard-basic'
					label='Name'
					value={user.name}
					onChange={handleFromChange('name')}
				/>
				<TextField
					id='standard-basic'
					label='Surname'
					value={user.surname}
					onChange={handleFromChange('surname')}
				/>
				<Button variant='contained' color='primary' onClick={submitForm}>
					submit
				</Button>
			</form>
		</div>
	) : (
		<Loader />
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(CreateAccount));
