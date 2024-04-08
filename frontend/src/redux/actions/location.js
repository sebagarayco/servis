import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';
import { CREATE_LOCATION, CREATE_LOCATION_FAILURE } from './types';
import { toast } from 'react-toastify';

// CREATE LOCATION
export const createLocation = (payload) => (dispatch) => {

	// TODO: Handle comments
	console.log('Body createLocation: ', payload)

	axios
		.post('/api/create_location/', payload)
		.then((res) => {
			// TODO: Handle comments
			console.log('Pase por location.js', res.data)
			dispatch({
				type: CREATE_LOCATION,
				payload: res.data,
			});
			toast.success("Ubicación creada", { autoClose: 2000, icon: "📍️" });
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: CREATE_LOCATION_FAILURE,
			});
			toast.error("Error al crear ubicación: " + JSON.stringify(err.response.data), { autoClose: 2000 });
		});
};
