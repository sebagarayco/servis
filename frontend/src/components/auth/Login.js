import React, { Component, Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../redux/actions/auth';

export class Login extends Component {
	state = {
		username: '',
		password: '',
	};

	static propTypes = {
		login: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.login(this.state.username, this.state.password);
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		const { isAuthenticated } = this.props.auth;
		if (isAuthenticated) {
			return <Navigate to="/" />;
		}
		const { username, password } = this.state;
		return (
			<div className='auth-main'>
				<div className='auth-login-sub-main' >
					<div>
						<img className='auth-logo' src="static/handshake.png" />
					</div>
					<h1>Welcome to Servis!</h1>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<input type="text" className="form-control" name="username" onChange={this.onChange} value={username} placeholder='Username' />
						</div>
						<div className="form-group">
							<input type="password" className="form-control" name="password" onChange={this.onChange} value={password} placeholder='Password' />
						</div>
						<br />
						<div className="form-group">
							<button type="submit" className="btn btn-warning"> Login </button>
						</div>
						<p> Not registered? <Link to="/register">Register</Link> </p>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);