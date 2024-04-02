import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';
import { toast } from "react-toastify";
import { GET_CONTRACTS, CREATE_CONTRACT, DELETE_CONTRACT, UPDATE_CONTRACT, ADD_CONTRACT_COMMENT } from './types';

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
		.catch((err) => dispatch(
			returnErrors(err.response.data, err.response.status),
			toast.error("Failed to create contract!", { autoClose: 2000 })
		));
};

// DELETE CONTRACT
export const deleteContract = (contract) => (dispatch) => {
	axios
		.delete(`/api/contracts/${contract}`)
		.then((res) => {
			// TODO: Handle comments
			console.log('Pase por deleteContracts.js', res.data)
			dispatch({
				type: DELETE_CONTRACT,
				payload: contract,
			});
			toast.success("Contract deleted!", { autoClose: 2000 });
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE CONTRACT
export const updateContract = (id, payload) => (dispatch) => {
	axios
		.put(`/api/contracts/${id}/`, payload)
		.then((res) => {
			console.log('Pase por updateContracts.js', res.data)
			dispatch({
				type: UPDATE_CONTRACT,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD CONTRACT COMMENT
export const addContractComment = (id, payload) => (dispatch) => {
	console.log('Pase por addContractComment, payload: ', payload)
	axios
		.put(`/api/contracts/${id}/`, payload)
		.then(res => {
			console.log('Pase por addContractComment.js', res.data)
			dispatch({
				type: ADD_CONTRACT_COMMENT,
				payload: res.data,
			});
			toast.info("Comentario entregado 📨", { autoClose: 1000 });
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
