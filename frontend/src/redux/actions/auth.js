import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { toast } from "react-toastify";

import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
} from './types';

// TOKEN VALIDATION AND USER LOAD
export const loadUser = () => (dispatch, getState) => {
	// TODO: Handle comments
	console.log('Pase por ACTION loadUser')
	dispatch({ type: USER_LOADING });

	axios
		.get('/api/auth/user', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
			toast.info("Cargando información de usuario", { autoClose: 1000, icon: "👤" });
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

// USER LOGIN
export const login = (username, password) => (dispatch) => {
	// TODO: Handle comments
	console.log('Pase por ACTION login')

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ username, password });

	axios
		.post('/api/auth/login', body, config)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
			// TODO: Handle comments
			console.log('Pase por ACTION login SUCCESS', res.data)
			toast.success("Inicio de sesión correcto. Bienvenido/a " + username + "!", { autoClose: 2000, icon: "🔑" });
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: LOGIN_FAIL,
			});
			toast.error("Falló inicio de sesión para " + username + ". Verificar credenciales o contactar a Soporte");
		});
};

// USER REGISTRATION
export const register = ({ username, password, email, first_name, last_name, government_id, location }) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ username, email, password, first_name, last_name, government_id, location });

	axios
		.post('/api/auth/register', body, config)
		.then((res) => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			toast.info("Bienvenido/a " + username + "!", { autoClose: 2000, icon: "🤗" });
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: REGISTER_FAIL,
			});
			toast.error("Error en el registro de usuario. Soporte: " + JSON.stringify(err.response.data));
		});
};

// LOGOUT USUARIO
export const logout = () => (dispatch, getState) => {
	axios
		.post('/api/auth/logout', null, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: LOGOUT_SUCCESS,
			});
			toast.info("Hasta luego!", { autoClose: 2000, icon: "👋" });
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const tokenConfig = (getState) => {
	// OBTENER TOKEN DE STATE
	const token = getState().auth.token;
	// TODO: Handle comments
	console.log('Pase por ACTION tokenConfig', token)

	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// AGREGAR TOKEN AL HEADER
	if (token) {
		config.headers['Authorization'] = `Token ${token}`;
	}

	return config;
};