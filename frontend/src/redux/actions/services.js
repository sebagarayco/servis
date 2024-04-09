import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';
import { toast } from "react-toastify";
import { GET_SERVICES, CREATE_SERVICE, CREATE_SERVICE_FAILURE, DELETE_SERVICE, DELETE_SERVICE_FAILURE, ADD_SERVICE_REVIEW } from './types';

// GET SERVICES
export const getServices = () => (dispatch, getState) => {
	axios
		.get('/api/services/', tokenConfig(getState))
		.then((res) => {
			// TODO: Handle comments
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

	// TODO: Handle comments
	console.log('Body createService: ', payload)

	axios
		.post('/api/services/', payload)
		.then((res) => {
			// TODO: Handle comments
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
			toast.error("Error al eliminar servicio: " + JSON.stringify(err.response.data), { autoClose: 2000, icon: "❌" });
		});
};

// DELETE SERVICE
export const deleteService = (service) => (dispatch) => {
	axios
		.delete(`/api/services/${service}/`)
		.then((res) => {
			dispatch({
				type: DELETE_SERVICE,
				payload: service,
			});
			toast.success("Servicio eliminado", { autoClose: 2000, icon: "🗑️" });
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: DELETE_SERVICE_FAILURE,
			});
			toast.error("Error al eliminar servicio. Verificar contratos existentes.", { autoClose: 2000, icon: "❌" });
		});
};
