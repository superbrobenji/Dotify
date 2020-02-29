import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';
import Navigation from './Navigation';

import Avatar from '@material-ui/core/Avatar';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
	user: state.user,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

const Account = props => {
	useEffect(() => {}, []);
	return (
		<div>
			<Navigation />
			<Avatar alt='' src={props.user.imageUrl} />
			<h3>{props.user.name}</h3>
			<h3>{props.user.surname}</h3>

			<div>
				<h2>Albums</h2>
				albums go here
			</div>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(Account));
