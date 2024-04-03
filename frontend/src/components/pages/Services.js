import React, { Component } from 'react';
import Nav from '../layout/Nav';
import ServisSpinner from '../utils/ServisSpinner';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
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
		return (
			<div>
				<Nav />
				<Container>
					<Row xs={1} md={2} lg={3} className="g-4">
						{this.state.loading ? (
							<ServisSpinner />
						) : (
							this.props.services.map(service => (
								<Col key={service.id}>
									<Card>
										<Card.Img variant="top" src={service.image} />
										<Card.Body>
											<Card.Title>{service.description}</Card.Title>
											<Card.Text>{service.subcategory.name}</Card.Text>
											<Card.Text>
												<strong>Precio por hora:</strong> ${service.hourly_price}
											</Card.Text>
											<Card.Text>
												<strong>Precio por día completo:</strong> ${service.full_day_price}
											</Card.Text>
											<Button variant="primary">Contratar</Button>
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