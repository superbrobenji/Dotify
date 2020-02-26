import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Home from './Home';
import Landing from './Landing';
import Account from './Account';
import Genres from './Genres';
import Artists from './Artists';

import * as ROUTES from '../router/routes';

const mapStateToProps = state => {
	return {
		isEmpty: state.firebaseReducer.auth.isEmpty,
	};
};

const App = ({ isEmpty }) => (
	<Router>
		<Route path={ROUTES.HOME} component={Home} />
		<Route exact path={ROUTES.LANDING} component={Landing} />
		<Route path={ROUTES.SIGN_IN} component={SignIn} />
		<Route path={ROUTES.SIGN_UP} component={SignUp} />
		<Route path={ROUTES.ACCOUNT} component={Account} />
		<Route path={ROUTES.ARTISTS} component={Artists} />
		<Route path={ROUTES.GENRES} component={Genres} />
	</Router>
);
export default connect(mapStateToProps)(App);
