import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { register } from '../../redux/actions/auth';
import { createLocation } from '../../redux/actions/location';
import { createMessage } from '../../redux/actions/messages';
// Utils
import ServisSpinner from '../utils/ServisSpinner';

export class Register extends Component {
	state = {
		username: '',
		email: '',
		first_name: '',
		last_name: '',
		government_id: '',
		password: '',
		password2: '',
		address: '',
		city: '',
		province: '',
		zip_code: '',
		country: 'Argentina',
		loading: false,
	};

	static propTypes = {
		register: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true }); // Start loading
		const { username, email, password, password2, first_name, last_name, government_id, address, city, province, zip_code, country } = this.state;
		if (password !== password2) {
			this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
		} else {
			const newUser = {
				username,
				first_name,
				last_name,
				government_id,
				password,
				email
			};

			/* Create Location w/axios
			not ideal but couldn't handle async await with redux. */
			axios.post('http://localhost/api/create_location/', {
				address: address,
				city: city,
				province: province,
				zip_code: zip_code,
				country: country,
			})
				.then(res => {
					const newUserLocation = { ...newUser, location: res.data.id }
					this.setState({ loading: false }); // Stop loading
					this.props.register(newUserLocation);
				})
				.catch(err => {
					this.setState({ loading: false }); // Stop loading
					toast.error("Error creating location. User without location. Contact Support." + JSON.stringify(err.response.data));
					this.props.register(newUser);
				})
		}
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		// TODO: Handle comments
		console.log('Pase por Register: ', this.state);

		if (this.props.isAuthenticated) {
			return <Navigate to="/" />;
		}

		const { username, email, password, password2, first_name, last_name, government_id, address, city, province, zip_code, country, loading } = this.state;
		return (
			<div className="auth-main">
				{loading ? (
					<ServisSpinner />
				) : (
					<div className="auth-register-sub-main">
						<div>
							<img className='auth-logo' src="static/handshake.png" />
						</div>
						<h1>Join us!</h1>
						<form className="auth-form" onSubmit={this.onSubmit} >
							<div className="auth-sub-main-left">
								<div className="form-group">
									<input type="text" className="form-control" name="username" onChange={this.onChange} value={username} placeholder='Username' autoFocus />
								</div>
								<div className="form-group">
									<input type="email" className="form-control" name="email" onChange={this.onChange} value={email} placeholder='E-mail' />
								</div>
								<div className="form-group">
									<input type="text" className="form-control" name="first_name" onChange={this.onChange} value={first_name} placeholder='First Name' />
								</div>
								<div className="form-group">
									<input type="text" className="form-control" name="last_name" onChange={this.onChange} value={last_name} placeholder='Last Name' />
								</div>
								<div className="form-group">
									<input type="text" className="form-control" name="government_id" onChange={this.onChange} value={government_id} placeholder='National ID (DNI/SSN)' />
								</div>
								<div className="form-group">
									<input type="password" className="form-control" name="password" onChange={this.onChange} value={password} placeholder='Password' />
								</div>
								<div className="form-group">
									<input type="password" className="form-control" name="password2" onChange={this.onChange} value={password2} placeholder='Repeat Password' />
								</div>
							</div>
							<div className="auth-separator"></div>
							<div className="auth-sub-main-right">
								<div className="form-group">
									<input type="text" className="form-control" name="address" required onChange={this.onChange} value={address} placeholder='Address' />
								</div>
								<div className="form-group">
									<input type="text" className="form-control" name="city" required onChange={this.onChange} value={city} placeholder='City' />
								</div>
								<div className="form-group">
									<input type="text" className="form-control" name="province" required onChange={this.onChange} value={province} placeholder='Province' />
								</div>
								<div className="form-group">
									<input type="number" className="form-control" name="zip_code" onChange={this.onChange} value={zip_code} placeholder='Zip Code' />
								</div>
								<div className="form-group">
									<select className="form-control" name="country" disabled onChange={this.onChange} value={country} placeholder='Country'>
										<option value="Argentina">Argentina</option>
									</select>
								</div>
								<br />
								<div className="form-group">
									<button type="submit" className="btn btn-warning"> Register </button>
									<p> Already have an account? <Link to="/login">Login</Link> </p>
								</div>
							</div>
						</form>
					</div >
				)
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createLocation, createMessage })(Register);