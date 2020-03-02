import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploadArtistImage, uploadUserData } from '../actions/profile';
import requireAuth from './hoc/requireAuth';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { useStyles, theme } from '../MaterialTheme/globalTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Loader from './Loader';

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

		props.uploadArtistImage(image, props.uid);
	};
	return (
		<ThemeProvider theme={theme}>
			<div className={classes.body}>
				<Card className={classes.card}>
					<CardContent className={classes.cardContent}>
						<div className={classes.cardContent}>
							{props.isLoading ? (
								<Loader />
							) : (
								<Avatar
									style={{ width: '6rem', height: '6rem' }}
									alt=''
									src={props.imageUrl}
								/>
							)}
							<input
								accept='image/*'
								className={classes.input}
								id='contained-button-file'
								type='file'
								onChange={handleImageChange}
							/>
							<label htmlFor='contained-button-file'>
								<div className={classes.button}>
									<Button variant='contained' color='primary' component='span'>
										Upload
									</Button>
								</div>
							</label>
						</div>
						<form className={classes.cardContent} noValidate autoComplete='off'>
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
							<div className={classes.button}>
								<Button
									variant='contained'
									color='primary'
									onClick={submitForm}
								>
									submit
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</ThemeProvider>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(CreateAccount));
