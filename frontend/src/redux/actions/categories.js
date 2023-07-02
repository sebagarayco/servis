import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_CATEGORIES, GET_SUBCATEGORIES, GET_SERVICES } from './types';

// GET CATEGORIES
export const getCategories = () => (dispatch, getState) => {
	axios
		.get('/api/categories/', tokenConfig(getState))
		.then((res) => {
			console.log('Pase por categories.js', res.data)
			dispatch({
				type: GET_CATEGORIES,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET SUBCATEGORIES
export const getSubcategories = () => (dispatch, getState) => {
	axios
		.get('/api/subcategories/', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_SUBCATEGORIES,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
