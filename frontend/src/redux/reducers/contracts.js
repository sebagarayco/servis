import { GET_CONTRACTS, CREATE_CONTRACT, DELETE_CONTRACT } from '../actions/types.js';

const initialState = {
	contracts: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_CONTRACTS:
			return {
				...state,
				contracts: action.payload,
			};
		case CREATE_CONTRACT:
			return {
				...state,
				contracts: [...state.contracts, action.payload],
			};
		case DELETE_CONTRACT:
			// TODO: Handle comments
			console.log('Pase por deleteContract.js', action.payload)
			return {
				...state,
				contracts: state.contracts.filter((contract) => contract.id !== action.payload),
			};
		default:
			return state;
	}
}