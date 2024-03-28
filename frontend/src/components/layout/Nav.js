import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { getUserData } from '../../redux/actions/userdata';
// Asume que tienes una acción llamada getContracts o similar
import { getContracts } from '../../redux/actions/contracts';

export class Nav extends Component {

	componentDidMount() {
		this.props.getContracts();
	}

	render() {
		console.log('Pase por Nav.js');
		const { isAuthenticated, user } = this.props.auth;
		const contractsCount = this.props.contracts ?
			this.props.contracts.filter(contract => contract.consumer.id === user.id).length : 0;

		if (!isAuthenticated) {
			return <Navigate to="/login" />;
		}

		return (
			<div>
				<img className='logo' src="static/handshake56.png" />
				<ul className='nav-ul'>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/offer">Ofrecer</Link></li>
					<li><Link to="/hire">Contratar</Link></li>
					<li><Link to="/services">Servicios</Link></li>
				  {isAuthenticated &&
					  <li className='logged'>
						  <button onClick={this.props.logout} className="btn btn-warning">
							  Logout
						  </button>
					  </li>
				  }
					<li className='logged'>
						<div className="nav-profile">
							<Link to="/profile">Profile</Link>
							{contractsCount > 0 && (
								<span className="nav-badge">{contractsCount}</span>
							)}
						</div>
					</li>
					<li className='logged'>Welcome, <strong>{user.username}</strong>!</li>
			  </ul>
		  </div>
		);
	}
}

// Ajusta esta función según cómo esté estructurado tu estado de Redux
const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.userdata.user,
	users: state.userdata.users,
	contracts: state.contracts.contracts, // Asegúrate de que esto refleje cómo se almacenan tus contratos
});

export default connect(mapStateToProps, { logout, getContracts })(Nav);