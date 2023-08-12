import React from "react";
// Redux
import { useSelector } from 'react-redux';
// Bootstrap
import { Row, Col, Button, Form } from "react-bootstrap";
// Icons
import { FaFileContract } from "react-icons/fa";
// Utils
import TimestampConverter from '../utils/TimestampConverter';

const HireServiceList = ({ services }) => {
	const { auth } = useSelector(state => state);

	const onSubmit = (e) => {
		e.preventDefault();
		// TODO: Handle comments
		console.log('HireServiceList onSubmit: ', e);
	};

	return (
		<div className='service-list'>
			<Form onSubmit={onSubmit}>
				{services.filter(service => service.provider !== auth.user.id).map((service, id) => (
					<Row key={id} className='service-row'>
						<Col md={2}>
							<div className="service-card-img">
								<img src={service.user.image} alt={`Service ${id}`} className="service-user-photo" />
							</div>
						</Col>
						<Col md={5}>
							<div className="service-card">
								<h3>Service</h3>
								<hr />
								<h5>{service.description}</h5>
								<p>{service.subcategory.name} ({service.subcategory.category})</p>
								<p>Price per hour: $ {service.hourly_price}</p>
								<p>Full-day price: $ {service.full_day_price}</p>
								<TimestampConverter timestamp={service.updated} />
							</div>
						</Col>
						<Col md={3}>
							<div className="service-card">
								<h3>Provider</h3>
								<hr />
								<h5>{service.user.first_name} {service.user.last_name}</h5>
								<p>{service.user.email}</p>
								<p>{service.user.phone}</p>
								<p>{service.user.location.coordinates}</p>
								<p>Rating:</p>
							</div>
						</Col>
						<Col md={1}>
							<Button className="btn btn-warning" size='lg' type="submit">
								<FaFileContract /> Hire
							</Button>
						</Col>
					</Row>
				))}
			</Form>
		</div>
	);
};

export default HireServiceList;