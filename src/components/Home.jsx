import React from 'react';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';
import requireAuth from './hoc/requireAuth';

const mapStateToProps = state => ({
	...state,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

function Home(props) {
	return <div>this is home</div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Home));
