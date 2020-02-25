import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';

const mapDispatchToProps = dispatch => ({
	signup: (email, password) => dispatch(signup(email, password)),
});

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	margin: {
		margin: theme.spacing(1),
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	textField: {
		width: 200,
	},
}));

const SignUp = props => {
	const history = useHistory();
	const classes = useStyles();
	const [values, setValues] = React.useState({
		email: '',
		password: '',
		passwordVer: '',
	});

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleClickShowPasswordVer = () => {
		setValues({ ...values, showPasswordVer: !values.showPassword });
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const signUp = () => {
		if (values.password === values.passwordVer) {
			props.signup(values.email, values.password).then(history.push('/home'));
		} else {
			console.log('passwords did not match');
		}
	};

	const signIn = () => {
		history.push('/signin');
	};

	return (
		<div>
			<FormControl className={clsx(classes.margin, classes.textField)}>
				<InputLabel htmlFor='standard-with-icon-adornment'>Email</InputLabel>
				<Input
					id='input-with-icon-adornment'
					value={values.email}
					onChange={handleChange('email')}
				/>
			</FormControl>
			<FormControl className={clsx(classes.margin, classes.textField)}>
				<InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
				<Input
					id='standard-adornment-password'
					type={values.showPassword ? 'text' : 'password'}
					value={values.password}
					onChange={handleChange('password')}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
								{values.showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<FormControl className={clsx(classes.margin, classes.textField)}>
				<InputLabel htmlFor='standard-adornment-password'>
					Re-enter Password
				</InputLabel>
				<Input
					id='standard-adornment-password'
					type={values.showPasswordVer ? 'text' : 'password'}
					value={values.passwordVer}
					onChange={handleChange('passwordVer')}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleClickShowPasswordVer}
								onMouseDown={handleMouseDownPassword}
							>
								{values.showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<Button variant='contained' color='primary' onClick={signUp}>
				Sign Up
			</Button>
			<p>
				already have an account?{' '}
				<Button variant='contained' color='primary' onClick={signIn}>
					Sign In
				</Button>
			</p>
		</div>
	);
};
export default connect(null, mapDispatchToProps)(SignUp);
