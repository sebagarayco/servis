import React, { Component } from 'react';
import Nav from '../layout/Nav';
import ServisSpinner from '../utils/ServisSpinner';
import { Row, Col, Container, Card, Badge } from 'react-bootstrap';
// Actions
import { getServices } from '../../redux/actions/services';
// Redux
import { connect } from 'react-redux';

export class Services extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1000);

		this.props.getServices();
	}

	render() {
		const { services } = this.props;
		const slicedServices = services.slice(0, 12); 

		return (
			<div>
				<Nav />
				<Container>
					<Row>
						<h1>Servicios</h1>
					</Row>
					<hr />
					<Row xs={1} md={2} lg={3} >
						{this.state.loading ? (
							<ServisSpinner />
						) : (
								slicedServices.map(service => (
									<Col key={service.id} xs={12} sm={6} md={4} className='services-col'>
										<Card className="services-card">
											<Card.Img
												variant="top"
												src={service.image || 'https://via.placeholder.com/300'}
												className="card-image"
											/>
											<Card.Body className="d-flex flex-column justify-content-between">
												<div>
													<Card.Title>{service.description}</Card.Title>
													<Card.Text>
														<h4>
															<Badge pill bg='secondary'>{service.subcategory.name}</Badge>
														</h4>
													</Card.Text>
													<Card.Text>
														<strong>Precio por hora:</strong> ${service.hourly_price}
													</Card.Text>
													<Card.Text>
														<strong>Precio por día completo:</strong> ${service.full_day_price}
													</Card.Text>
													<Card.Text>
														<strong>Publicado el:</strong> {new Date(service.created).toLocaleString(('es-ES'))}
													</Card.Text>
												</div>
										</Card.Body>
									</Card>
								</Col>
							))
						)}
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	services: state.services.services,
});

export default connect(mapStateToProps, { getServices })(Services);
