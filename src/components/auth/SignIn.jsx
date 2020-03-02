import React from 'react';
import { connect } from 'react-redux';
import { signin, resetPassword } from '../../actions/auth';
import { startup } from '../../actions/startup';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles, theme } from '../../MaterialTheme/globalTheme';
const mapDispatchToProps = dispatch => ({
	signin: (email, password, callback) =>
		dispatch(signin(email, password, callback)),
	resetPassword: email => dispatch(resetPassword(email)),
	startup: uid => dispatch(startup(uid)),
});

const SignIn = props => {
	const history = useHistory();
	const classes = useStyles();
	const [values, setValues] = React.useState({
		email: '',
		password: '',
		recoveryEmail: '',
	});
	const [open, setOpen] = React.useState(false);

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const signIn = () => {
		props.signin(values.email, values.password, uid => {
			props.startup(uid);
			history.push('/home');
		});
	};

	const signUp = () => {
		history.push('/signup');
	};

	const reset_password = () => {
		props.resetPassword(values.recoveryEmail);
		handleClose();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className={classes.body}>
				<Card className={classes.card}>
					<CardContent>
						<div className={classes.cardContent}>
							<FormControl className={clsx(classes.margin, classes.textField)}>
								<InputLabel htmlFor='standard-with-icon-adornment'>
									Email
								</InputLabel>
								<Input
									id='input-with-icon-adornment'
									value={values.email}
									onChange={handleChange('email')}
								/>
							</FormControl>
							<FormControl className={clsx(classes.margin, classes.textField)}>
								<InputLabel htmlFor='standard-adornment-password'>
									Password
								</InputLabel>
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
												{values.showPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
							<div className={classes.button}>
								<Button variant='contained' color='primary' onClick={signIn}>
									Sign In
								</Button>
							</div>
						</div>
						<div className={classes.button}>
							Don't have an account?
							<Button color='primary' onClick={signUp}>
								Sign Up
							</Button>
						</div>
						<div className={classes.button}>
							forgot your password?
							<Button color='primary' onClick={handleClickOpen}>
								Reset Password
							</Button>
						</div>
						<Dialog
							open={open}
							onClose={handleClose}
							aria-labelledby='form-dialog-title'
						>
							<DialogTitle id='form-dialog-title'>
								Reset Your Password
							</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Please enter your account email.
								</DialogContentText>
								<FormControl
									className={clsx(classes.margin, classes.textField)}
								>
									<InputLabel htmlFor='standard-with-icon-adornment'>
										Email
									</InputLabel>
									<Input
										id='input-with-icon-adornment'
										value={values.recoveryEmail}
										onChange={handleChange('recoveryEmail')}
									/>
								</FormControl>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose} color='primary'>
									Cancel
								</Button>
								<Button onClick={reset_password} color='primary'>
									Send Email
								</Button>
							</DialogActions>
						</Dialog>
					</CardContent>
				</Card>
			</div>
		</ThemeProvider>
	);
};
export default connect(null, mapDispatchToProps)(SignIn);
