import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'
import React, { Component } from 'react'
// Actions
import { logout } from '../../redux/actions/auth';
import { getUserData } from '../../redux/actions/userdata';

export class Nav extends Component {

	render() {
		console.log('Pase por Nav.js')
		const { isAuthenticated } = this.props.auth;

		if (!isAuthenticated) {
			return <Navigate to="/login" />;
		}

		return (
			<div >
				<img className='logo' src="static/handshake56.png" />
				<ul className='nav-ul'>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/offer">Ofrecer</Link></li>
					<li><Link to="/hire">Contratar</Link></li>
					<li><Link to="/services">Servicios</Link></li>
					{isAuthenticated ?
						<li className='logged'>
							<button onClick={this.props.logout} className="btn btn-warning">
								Logout
							</button>
						</li>
						: null}
					<li className='logged'><Link to="/profile">Profile</Link></li>
					<li className='logged'>Welcome, <strong>{this.props.auth.user.username}</strong>!</li>
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.userdata.user,
	users: state.userdata.users,
});

export default connect(mapStateToProps, { logout })(Nav);