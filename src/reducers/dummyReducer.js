export default (state = {}, action) => {
	switch (action.type) {
		case 'DUMMY_ACTION':
			return {
				result: action.payload,
			};
		default:
			return state;
	}
};
