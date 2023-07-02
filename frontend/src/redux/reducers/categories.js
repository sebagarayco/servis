import { GET_CATEGORIES, GET_SUBCATEGORIES } from '../actions/types.js';

const initialState = {
	categories: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		case GET_SUBCATEGORIES:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}