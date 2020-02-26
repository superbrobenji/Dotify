import React from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';

import Loader from './Loader';

const mapStateToProps = state => ({
	isLoaded: state.firebaseReducer.auth.isLoaded,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

const CreateAccount = props => {
	return props.isLoaded ? <div>this is CreateAccount</div> : <Loader />;
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(requireAuth(CreateAccount));
