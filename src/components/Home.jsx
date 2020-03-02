import React from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';

import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles, theme } from '../MaterialTheme/globalTheme';

import Navigation from './Navigation';
const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	createdProfile: state.user.createdProfile,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

const Home = props => {
	const classes = useStyles();

	// useEffect(() => {
	// 	if (props.createdProfile === false) history.push('/createaccount');
	// }, [props.createdProfile, history]);

	return (
		<ThemeProvider theme={theme}>
			<Navigation /> <div className={classes.body}>this is Home</div>
		</ThemeProvider>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Home));
