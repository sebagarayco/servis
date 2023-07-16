import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_SERVICES, CREATE_SERVICE, DELETE_SERVICE, UPDATE_SERVICE } from './types';

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
export const createService = (category, subcategory, description, hourly_price, full_day_price, provider) => (dispatch) => {

	const body = JSON.stringify({ category, subcategory, description, hourly_price, full_day_price, provider });

	axios
		.post('/api/services/', body)
		.then((res) => {
			console.log('Pase por createServices.js', res.data)
			dispatch({
				type: CREATE_SERVICE,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
