import { GET_CONTRACTS, CREATE_CONTRACT, DELETE_CONTRACT, UPDATE_CONTRACT, ADD_CONTRACT_COMMENT, ADD_CONTRACT_REVIEW } from '../actions/types.js';

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
		case UPDATE_CONTRACT:
			// TODO: Handle comments
			console.log('Pase por updateContract.js', action.payload)
			return {
				...state,
				contracts: state.contracts.map((contract) => (contract.id === action.payload.id ? action.payload : contract)),
			};
		case ADD_CONTRACT_REVIEW:
		case ADD_CONTRACT_COMMENT:
			console.log('Pasé por ADD_CONTRACT_*, mostrando payload: ', action.payload);
			return {
				...state,
				contracts: state.contracts.map((contract) => (contract.id === action.payload.id ? action.payload : contract)),
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