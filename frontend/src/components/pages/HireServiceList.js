import React from "react";
// Bootstrap
import { Row, Col } from "react-bootstrap";

const HireServiceList = ({ services }) => {
	return (
		<div className='service-list'>
			{services.map((service, id) => (
				<Row key={id} className='service-row'>
					<Col md={2}>
						<div className="service-card">
							<img src={service.user.image} alt={`Service ${id}`} className="service-user-photo" />
						</div>
					</Col>
					<Col md={4}>
						<div className="service-card">
							<h3>{service.description}</h3>
						</div>
					</Col>
					<Col md={4}>
						<div className="service-card">
							<h3>{service.user.name}</h3>
							<p>{service.user.email}</p>
							<p>{service.user.phone}</p>
						</div>
					</Col>
				</Row>
			))}
		</div>
	);
};

export default HireServiceList;