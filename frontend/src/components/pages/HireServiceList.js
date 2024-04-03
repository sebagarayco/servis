import React, { useState } from "react";
import { Link } from 'react-router-dom';
// Redux
import { connect, useSelector, useDispatch } from 'react-redux'
import { createContract } from '../../redux/actions/contracts';
// Bootstrap
import { Row, Col, Button, Form } from "react-bootstrap";
// Icons
import { FaFileContract } from "react-icons/fa";
// Utils
import TimestampConverter from '../utils/TimestampConverter';
// Pages
import HireModal from './HireModal';

const HireServiceList = ({ services }) => {
	const auth = useSelector(state => state.auth);	
	const [selectedService, setSelectedService] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	const handleOpenModal = (service) => {
		setSelectedService(service);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setSelectedService(null);
		setShowModal(false);
	};

	const handleHireSubmit = (hireData) => {
		// Assuming hireData contains amount, start date, and end date
		const { budget, startDate, endDate, consumer, description, provider } = hireData;

		// Dispatch the createContract action with the necessary parameters
		dispatch(createContract({
			amount: budget,
			description: description,
			consumer: consumer.id,
			start_date: startDate,
			end_date: endDate,
			provider: provider.id,
			service: selectedService.id,
		}));
		console.log('Hiring:', selectedService, 'Hire Data:', hireData);
		handleCloseModal();
	};


	return (
		<div className='service-list'>
			<Form>
				{services.filter(service => service.provider !== auth.user.id).map((service, id) => (
					<Row key={service.id} className='service-row'>
						<Col md={2}>
							<Link to={`/profile/${service.user.id}`}>
							<div className="service-card-img">
								<img src={service.user.image} alt={`Service ${service.id}`} className="service-user-photo" />
							</div>
							</Link>
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
								<h3>
									<Link to={`/profile/${service.user.id}`}>
										{service.user.first_name} {service.user.last_name}
									</Link>
								</h3>
								<p>{service.user.email}</p>
								<p>{service.user.phone}</p>
								<p>{service.user.location.properties.city + ', ' + service.user.location.properties.province}</p>
								<p>Rating:</p>
							</div>
						</Col>
						<Col md={1}>
							<Button className="btn btn-warning" size='lg' onClick={() => handleOpenModal(service)}>
								<FaFileContract /> Hire
							</Button>
						</Col>
					</Row>
				))}
			</Form>
			{showModal && (
				<HireModal
					service={selectedService}
					onHide={handleCloseModal}
					onSubmit={handleHireSubmit}
				/>
			)}
		</div>
	);
};

//export default HireServiceList;
export default connect()(HireServiceList);