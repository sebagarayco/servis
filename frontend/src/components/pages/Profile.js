import React, { Component } from 'react'
// Layout
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';
import ServisSpinner from '../utils/ServisSpinner';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// Redux
import { connect } from 'react-redux';
import ProfileContractTable from './ProfileContractTable';
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
						<Col>
							<div className='profile-image'>
								<img src={this.props.auth.user.image} />
							</div>
							<h2>Información de usuario</h2>
							<p>Nombre: {this.props.auth.user.first_name}</p>
							<p>Apellido: {this.props.auth.user.last_name}</p>
							<p>Correo: {this.props.auth.user.email}</p>
							<p>Telefono: {this.props.auth.user.phone}</p>
							<div>
								<Button size="lg" variant="outline-secondary">Ofrecer Servicio</Button>
								<Button size="lg" variant="outline-secondary">Contratar Servicio</Button>
							</div>
						</Col>
						<Col xs={4} md={6} lg={9} className='profile-services'>
							<Row >
								<h2>Servicios contratados</h2>
								<ProfileContractTable contracts={this.props.contracts.contracts} />
							</Row>
							<Row >
								<h2>Servicios ofrecidos</h2>
								<ProfileServiceTable services={this.props.services.services} />
							</Row>
							<Row >
								<h2>Pedidos</h2>
							</Row>
						</Col>
					</Row>
				</Container>
				{/* <Footer /> */}
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