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
									<h3><Badge pill bg="info">Perfil Privado</Badge></h3>
									<div className="profile-image">
										<img src={this.props.auth.user.image} alt="Profile" />
									</div>

									<hr style={{ width: '90%' }} />
									<h3>
										{this.props.auth.user.first_name} {this.props.auth.user.last_name}
									</h3>
									<h4>{this.props.auth.user.role}</h4>
									<h4>{this.props.auth.user.email}</h4>
									<h4>{this.props.auth.user.phone}</h4>
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
