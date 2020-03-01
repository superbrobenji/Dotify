import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';

export default ChildComponent => {
	const ComposedComponent = props => {
		useEffect(() => {
			if (props.auth.isLoaded && props.auth.isEmpty) {
				return props.history.push('/');
			}
			//TODO something wrong here
		}, [props.auth, props.history, props.user]);

		return props.user.isLoading ? <Loader /> : <ChildComponent {...props} />;
	};

	function mapStateToProps(state) {
		return {
			auth: state.firebaseReducer.auth,
			user: state.user,
		};
	}

	return connect(mapStateToProps)(ComposedComponent);
};
