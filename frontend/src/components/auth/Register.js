import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../redux/actions/auth';
import { createMessage } from '../../redux/actions/messages';

export class Register extends Component {
	state = {
		username: '',
		email: '',
		first_name: '',
		last_name: '',
		password: '',
		password2: '',
	};

	static propTypes = {
		register: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { username, email, password, password2, first_name, last_name } = this.state;
		if (password !== password2) {
			this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
		} else {
			const newUser = {
				username,
				first_name,
				last_name,
				password,
				email,
			};
			this.props.register(newUser);
		}
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		console.log('Pase por Register: ', this.state);

		if (this.props.isAuthenticated) {
			return <Navigate to="/" />;
		}

		const { username, email, password, password2, first_name, last_name } = this.state;
		return (
			<div className="auth-main">
				<div className="auth-sub-main">
					<div>
						<img className='auth-logo' src="static/handshake.png" />
					</div>
					<h1>Join us!</h1>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<input type="text" className="form-control" name="username" onChange={this.onChange} value={username} placeholder='Username' />
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
							<input type="password" className="form-control" name="password" onChange={this.onChange} value={password} placeholder='Password' />
						</div>
						<div className="form-group">
							<input type="password" className="form-control" name="password2" onChange={this.onChange} value={password2} placeholder='Repeat Password' />
						</div>
						<br />
						<div className="form-group">
							<button type="submit" className="btn btn-warning"> Register </button>
						</div>
						<p> Already have an account? <Link to="/login">Login</Link> </p>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);