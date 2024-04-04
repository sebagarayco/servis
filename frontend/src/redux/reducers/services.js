import { GET_SERVICES, CREATE_SERVICE, DELETE_SERVICE, UPDATE_SERVICE, ADD_SERVICE_REVIEW } from '../actions/types.js';

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
				services: [...state.services, action.payload],
			};
		case UPDATE_SERVICE:
			return {
				...state,
				...action.payload,
			};
		case ADD_SERVICE_REVIEW:
			// TODO: Handle comments
			console.log('Pase por REDUCER addServiceReview.js', action.payload)
			return {
				...state,
				services: state.services.map((service) => (service.id === action.payload.id ? action.payload : service)),
			};
		case DELETE_SERVICE:
			// TODO: Handle comments
			console.log('Pase por deleteService.js', action.payload)
			return {
				...state,
				services: state.services.filter((service) => service.id !== action.payload),
			};
		default:
			return state;
	}
}