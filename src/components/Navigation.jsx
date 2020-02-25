import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../router/routes';
import Button from '@material-ui/core/Button';
import { signout } from '../actions/auth';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
	...state,
});

const mapDispatchToProps = dispatch => ({
	signout: () => dispatch(signout()),
});

const Navigation = props => {
	const signOut = () => {
		props.signout();
	};

	return (
		<div>
			<ul>
				<li>artists</li>
				<li>
					<Link to={ROUTES.HOME}>Home</Link>
				</li>
				<li>genres</li>
			</ul>
			<Button variant='contained' color='primary' onClick={signOut}>
				Sign Out
			</Button>
		</div>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
