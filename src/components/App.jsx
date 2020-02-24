import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './Navigation';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Home from './Home';
import Landing from './Landing';
import * as ROUTES from '../router/routes';

const mapStateToProps = state => {
	return {
		auth: state.firebaseReducer.auth,
	};
};

const App = ({ auth }) => (
	<Router>
		<div>
			{!auth.isEmpty ? <Navigation /> : <p>Welcome</p>}

			<hr />
			<Route path={ROUTES.HOME} component={Home} />
			<Route exact path={ROUTES.LANDING} component={Landing} />
			<Route path={ROUTES.SIGN_IN} component={SignIn} />
			<Route path={ROUTES.SIGN_UP} component={SignUp} />
		</div>
	</Router>
);
export default connect(mapStateToProps)(App);
