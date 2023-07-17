import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';
import { toast } from "react-toastify";
import { GET_SERVICES, CREATE_SERVICE, CREATE_SERVICE_FAILURE, DELETE_SERVICE, UPDATE_SERVICE } from './types';

// GET SERVICES
export const getServices = () => (dispatch, getState) => {
	axios
		.get('/api/services/', tokenConfig(getState))
		.then((res) => {
			console.log('Pase por services.js', res.data)
			dispatch({
				type: GET_SERVICES,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// CREATE SERVICE
export const createService = (payload) => (dispatch) => {

	console.log('Body createService: ', payload)

	axios
		.post('/api/services/', payload)
		.then((res) => {
			console.log('Pase por createServices.js', res.data)
			dispatch({
				type: CREATE_SERVICE,
				payload: res.data,
			});
			toast.success("Service created!", { autoClose: 2000 });
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: CREATE_SERVICE_FAILURE,
			});
			toast.error("Unable to create service: " + JSON.stringify(err.response.data), { autoClose: 2000 });
		});
};
