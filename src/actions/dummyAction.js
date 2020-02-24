export const dummyAction = () => dispatch => {
	dispatch({
		type: 'DUMMY_ACTION',
		payload: 'result_of_dummy_action',
	});
};
