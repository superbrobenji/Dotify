import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { signin } from '../../actions/auth';

const mapStateToProps = state => ({
	...state,
});

const mapDispatchToProps = dispatch => ({
	signin: (email, password, callback) =>
		dispatch(signin(email, password, callback)),
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

const SignIn = props => {
	const classes = useStyles();
	const [values, setValues] = React.useState({
		email: '',
		password: '',
	});

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const submit = () => {
		console.log(values.email + ' ' + values.password);
		props.signin(values.email, values.password, () =>
			props.history.push('/home'),
		);
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
			<Button variant='contained' color='primary' onClick={submit}>
				Sign In
			</Button>
		</div>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
