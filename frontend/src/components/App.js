import './App.css';
import React, { Component } from 'react'
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Navigate, Route, Switch, Routes } from 'react-router-dom';
// Redux
import { loadUser } from '../redux/actions/auth';
import { Provider } from 'react-redux';
import store from '../redux/store';
// Pages
import ProtectedRoutes from './auth/ProtectedRoutes';
import Home from './pages/Home';
import Offer from './pages/Offer';
import Hire from './pages/Hire';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Login from './auth/Login';
import ProfilePublic from './pages/ProfilePublic';
import Register from './auth/Register';
import { ToastContainer } from "react-toastify";

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}

	render() {
		return (
			<Provider store={store} >
				<div className='app'>
					<Router>
						<ToastContainer autoClose={3000} position='bottom-right' enableMultiContainer='true' />
						<Routes>
							<Route element={<ProtectedRoutes />}>
								<Route path='/' element={<Home />} />
								<Route path='/services' element={<Services />} />
								<Route path='/offer' element={<Offer />} />
								<Route path='/hire' element={<Hire />} />
								<Route path='/profile/:user_id' element={<ProfilePublic />} />
								<Route path='/profile' element={<Profile />} />
							</Route>
							<Route path="/logout" element={<Login />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</Routes>
					</Router>
				</div>
			</Provider>
		);
	}
}

const rootElement = document.getElementById("app");
const root = ReactDOMClient.createRoot(rootElement);
root.render(<App />);