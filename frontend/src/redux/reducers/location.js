import { CREATE_LOCATION } from '../actions/types.js';

const initialState = {
	location: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case CREATE_LOCATION:
			return {
				...state,
				location: action.payload,
			};
		default:
			return state;
	}
}