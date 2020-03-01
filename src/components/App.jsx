import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Home from './Home';
import Landing from './Landing';
import Account from './Account';
import Genres from './Genres';
import Artists from './Artists';
import Songs from './Songs';
import CreateAccount from './CreateAccount';
import Albums from './Albums';
import ArtistAlbums from './ArtistAlbums';

import * as ROUTES from '../router/routes';

const App = () => (
	<Router>
		<Route path={ROUTES.HOME} component={Home} />
		<Route exact path={ROUTES.LANDING} component={Landing} />
		<Route path={ROUTES.SIGN_IN} component={SignIn} />
		<Route path={ROUTES.SIGN_UP} component={SignUp} />
		<Route path={ROUTES.ACCOUNT} component={Account} />
		<Route path={ROUTES.ARTISTS} component={Artists} />
		<Route path={ROUTES.GENRES} component={Genres} />
		<Route path={ROUTES.CREATEACCOUNT} component={CreateAccount} />
		<Route path={ROUTES.ALBUMS} component={Albums} />
		<Route path={ROUTES.SONGS} component={Songs} />
		<Route path={ROUTES.ARTISTALBUMS} component={ArtistAlbums} />
	</Router>
);
export default App;
