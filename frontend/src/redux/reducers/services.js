import { GET_SERVICES, CREATE_SERVICE, DELETE_SERVICE, UPDATE_SERVICE } from '../actions/types.js';

const initialState = {
	services: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_SERVICES:
			return {
				...state,
				services: action.payload,
			};
		case CREATE_SERVICE:
			return {
				...state,
				...action.payload,
			};
		case UPDATE_SERVICE:
			return {
				...state,
				...action.payload,
			};
		case DELETE_SERVICE:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}