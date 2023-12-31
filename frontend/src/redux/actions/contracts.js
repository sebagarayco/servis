import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';
import { toast } from "react-toastify";
import { GET_CONTRACTS, CREATE_CONTRACT, DELETE_CONTRACT} from './types';

// GET CONTRACTS
export const getContracts = () => (dispatch, getState) => {
	axios
		.get('/api/contracts/', tokenConfig(getState))
		.then((res) => {
			// TODO: Handle comments
			console.log('Pase por getContracts.js', res.data)
			dispatch({
				type: GET_CONTRACTS,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// CREATE CONTRACT
export const createContract = (payload) => (dispatch) => {
	axios
		.post('/api/contracts/', payload)
		.then((res) => {
			// TODO: Handle comments
			console.log('Pase por createContracts.js', res.data)
			dispatch({
				type: CREATE_CONTRACT,
				payload: res.data,
			});
			toast.success("Contract sent!", { autoClose: 2000 });
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE CONTRACT
export const getSubcategories = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/contract/${id}`, tokenConfig(getState))
		.then((res) => {
			// TODO: Handle comments
			console.log('Pase por deleteContracts.js', res.data)
			dispatch({
				type: DELETE_CONTRACT,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
