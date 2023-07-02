import { GET_USERDATA, GET_ALLUSERS } from '../actions/types.js';

const initialState = {
	user: {},
	users: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_USERDATA:
			return {
				...state,
				user: action.payload,
			};
		case GET_ALLUSERS:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state;
	}
}