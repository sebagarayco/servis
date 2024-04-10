import React, { Component } from 'react';
// Utils
import ServisSpinner from '../utils/ServisSpinner';
// Layout
import Nav from '../layout/Nav';
// Bootstrap
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// Icons
import { RiToolsFill } from 'react-icons/ri';
import { MdOutlineCallReceived } from 'react-icons/md';
import { GrContract } from 'react-icons/gr';
// Redux
import { connect } from 'react-redux';
import ProfileContractTable from './ProfileContractTable';
import ProfileContractRequest from './ProfileContractRequest';
import ProfileServiceTable from './ProfileServiceTable';
import ProfileStatsRow from '../utils/ProfileStatsRow';
// Actions
import { getServices } from '../../redux/actions/services';
import { getContracts } from '../../redux/actions/contracts';
import HomeReviews from './HomeReviews';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false });
		}, 500);

		this.props.getServices();
		this.props.getContracts();
	}

	render() {

		return (
			<div>
				<Nav />
				{this.state.loading ? (
					<ServisSpinner />
				) : (
					<Container className="profile">
					<Row>
								<Col className="profile-info">
									<Card>
										<Card.Header>
											<h2><Badge pill bg="info">Perfil Privado</Badge></h2>
										</Card.Header>
										<Card.Img variant="top" src={this.props.auth.user.image} alt="Profile" />
										<Card.Body>
											<Card.Title>👤 Información</Card.Title>
											<ListGroup variant="flush">
												<ListGroup.Item>
													<strong>Nombre:</strong> {this.props.auth.user.first_name} {this.props.auth.user.last_name}
												</ListGroup.Item>
												<ListGroup.Item>
													<strong>Rol:</strong> {this.props.auth.user.role}
												</ListGroup.Item>
												<ListGroup.Item>
													<strong>Email:</strong> {this.props.auth.user.email}
												</ListGroup.Item>
												<ListGroup.Item>
													<strong>Teléfono:</strong> {this.props.auth.user.phone || 'N/A'}
												</ListGroup.Item>
											</ListGroup>
										</Card.Body>
										<Card.Body>
											<Card.Title>📍 Ubicación</Card.Title>
											<ListGroup variant="flush">
												<ListGroup.Item>
													<strong>Dirección:</strong> {this.props.auth.user.location.properties.address || 'N/A'}
												</ListGroup.Item>
												<ListGroup.Item>
													<strong>Ciudad:</strong> {this.props.auth.user.location.properties.city || 'N/A'}
												</ListGroup.Item>
												<ListGroup.Item>
													<strong>Estado:</strong> {this.props.auth.user.location.properties.state || 'N/A'}
												</ListGroup.Item>
												<ListGroup.Item>
													<strong>C.P:</strong> {this.props.auth.user.location.properties.zip_code || 'N/A'}
												</ListGroup.Item>
												<ListGroup.Item>
													<strong>País:</strong> {this.props.auth.user.location.properties.country || 'N/A'}
												</ListGroup.Item>
											</ListGroup>
										</Card.Body>
									</Card>
								</Col>
								<Col xs={4} md={6} lg={9} className="profile-services">
									<ProfileStatsRow
										services={this.props.services.services}
										contracts={this.props.contracts.contracts}
										userId={this.props.auth.user.id}
									/>
									<Row>
										<h2>
											<RiToolsFill /> Mis servicios ofrecidos
										</h2>
										<p>Mantené actualizado tu porfolio de servicios.</p>
										<ProfileServiceTable services={this.props.services.services} />
									</Row>
									<hr />
									<Row>
										<h2>
											<MdOutlineCallReceived /> Mis trabajos realizados
										</h2>
										<p>Estos son los pedidos de contratación que recibiste.</p>
										<ProfileContractRequest contracts={this.props.contracts.contracts} />
									</Row>
									<hr />
									<Row>
										<h2>
											<GrContract /> Servicios contratados
										</h2>
										<p>Servicios contratados a otros proveedores.</p>
										<ProfileContractTable contracts={this.props.contracts.contracts} />
									</Row>
									<Row>
										<HomeReviews userId={this.props.auth.user.id} />
									</Row>
								</Col>
							</Row>
						</Container>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	contracts: state.contracts,
	services: state.services,
});

export default connect(mapStateToProps, { getServices, getContracts })(Profile);
