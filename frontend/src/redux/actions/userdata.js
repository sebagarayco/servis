import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_USERDATA, GET_ALLUSERS } from './types';

// GET USERDATA :id
export const getUserData = (id) => (dispatch, getState) => {
	//const id = getState().auth.user.id;
	axios
		.get(`/api/users/${id}`, tokenConfig(getState))
		.then((res) => {
			// TODO: Handle comments
			console.log('Pase por userdata.js', res.data)
			dispatch({
				type: GET_USERDATA,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET ALL USERS USERDATA 
export const getAllUsers = () => (dispatch, getState) => {
	axios
		.get('/api/users', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_ALLUSERS,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
