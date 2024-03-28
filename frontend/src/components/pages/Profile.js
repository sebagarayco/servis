import React, { Component } from 'react'
// Layout
import Nav from '../layout/Nav';
// Bootstrap
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
// Redux
import { connect } from 'react-redux';
import ProfileContractTable from './ProfileContractTable';
import ProfileContractRequest from './ProfileContractRequest';
import ProfileServiceTable from './ProfileServiceTable';
// Actions
import { getServices } from '../../redux/actions/services';
import { getContracts } from '../../redux/actions/contracts';

export class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	componentDidMount() {
		// Simulate loading for 1.5 seconds
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1500);

		this.props.getServices();
		this.props.getContracts();
	}

	render() {
		return (
			<div>
				<Nav />
				<Container className='profile'>
					<Row>
						<Col className='profile-info'>
							<div className='profile-image'>
								<img src={this.props.auth.user.image} />
							</div>
							<hr style={{ width: '90%' }} />
							<h3>{this.props.auth.user.first_name} {this.props.auth.user.last_name}</h3>
							<h4>{this.props.auth.user.role}</h4>
							<h4>📧 {this.props.auth.user.email}</h4>
							<h4>📞 {this.props.auth.user.phone}</h4>
						</Col>
						<Col xs={4} md={6} lg={9} className='profile-services'>
							<Row >
								<h3>Mis servicios</h3>
								<p>Mantené actualizado tu porfolio de servicios.</p>
								<ProfileServiceTable services={this.props.services.services} />
							</Row>
							<hr />
							<Row >
								<h3>Solicitudes recibidas</h3>
								<p>Estos son los pedidos de contratación que recibiste.</p>
								<ProfileContractRequest contracts={this.props.contracts.contracts} />
							</Row>
							<hr />
							<Row >
								<h3>Servicios contratados</h3>
								<p>Servicios contratados a otros proveedores.</p>
								<ProfileContractTable contracts={this.props.contracts.contracts} />
							</Row>
						</Col>
					</Row>
				</Container>
			</div >
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	contracts: state.contracts,
	services: state.services
});

export default connect(mapStateToProps, { getServices, getContracts })(Profile);