import React, { Component } from 'react'
import Nav from '../layout/Nav';
// Redux
import axios from 'axios';
import { connect } from 'react-redux';
// Actions
import { createService, deleteService, getServices } from '../../redux/actions/services';
// Utils
import { toast } from 'react-toastify';
import TimestampConverter from '../utils/TimestampConverter';
import DeleteConfirmationModal from '../utils/DeleteConfirmationModal';
// Bootstrap
import { Container, Row, Col, Form, InputGroup, Button, Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
// Icons
import { MdHomeRepairService } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

export class Offer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: '',
			subcategory: '',
			description: '',
			hourly_price: '',
			full_day_price: '',
			showModal: false,
			setShowModal: false,
			city: '',
		}
	};

	componentDidMount() {
		this.props.getServices();
		// Set current city name based on user's location
		this.getCurrentCityName(this.props.auth.user.location.coordinates);
	}

	handleDeleteClick = (service) => {
		console.log('Deleting service with ID: ', service)
		this.props.deleteService(service);
		this.setState({ showModal: false });
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
		console.log('Selected ' + e.target.name + ' value: ' + e.target.value);
	}

	getCurrentCityName(position) {
		let url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2" +
			"&lat=" + position[1] + "&lon=" + position[0];

		axios.get(url)
			.then((res) => { this.setState({ city: res.data.display_name }); })
			.catch((err) => {
				toast.error('Error getting current city name: ' + err + '. Using coordinates instead.');
				this.setState({
					city: [position[0].toFixed(2), position[1].toFixed(2)]
				});
			});
	}

	onSubmit = (e) => {
		e.preventDefault();
		const { category, subcategory, description, hourly_price, full_day_price } = this.state;
		const provider = this.props.auth.user.id;
		const location = this.props.auth.user.location;
		const service = { category, subcategory, description, hourly_price, full_day_price, provider, location };
		console.log('Service to be created: ', service)
		this.props.createService(service);
	};

	render() {
		const tooltip = (
			<Tooltip id="tooltip">Default user location is used.</Tooltip>
		);

		return (
			<div>
				<Nav />
				<Container className='offer-container'>
					<Form className='offer-form' onSubmit={this.onSubmit}>
						<Row>
							<Col sm={15}>
								<h1>Offer service</h1>
							</Col>
						</Row>
						<Row className='offer-toprow'>
							<Col xs lg={4}>
								<Form.Label htmlFor="basic-url">Category (required)</Form.Label>
								<InputGroup size="lg" >
									<InputGroup.Text id="basic-addon1"><MdHomeRepairService /></InputGroup.Text>
									<Form.Select name='category' required='required' defaultValue={'default'} onChange={this.handleInputChange}>
										<option value="default" disabled>--- Select category ---</option>
										{this.props.categories.categories.map((category, id) => (
											<option
												key={id}
												value={category.name}
											>{category.name}
											</option>
										))}
									</Form.Select>
								</InputGroup>
							</Col>
							<Col xs lg={4} >
								<Form.Label htmlFor="basic-url">Subcategory (required)</Form.Label>
								<InputGroup size="lg" >
									<InputGroup.Text id="basic-addon1"><MdOutlineCleaningServices /></InputGroup.Text>
									<Form.Select name='subcategory' required='required' defaultValue={'default'} onChange={this.handleInputChange}>
										<option value="default" disabled>--- Select category ---</option>
										{this.props.categories.categories.filter(category => category.name === this.state.category).map((category, id) => (
											category.subcategories.map((subcategory, id) => (
												<option
													key={id}
													value={subcategory.name}
												>{subcategory.name}
												</option>
											))
										))}
									</Form.Select>
								</InputGroup>
							</Col>
							<Col xs lg={2}>
								<Form.Label htmlFor="basic-url">Hourly Rate (required)</Form.Label>
								<InputGroup name="hourly_price" size="lg" >
									<InputGroup.Text>$</InputGroup.Text>
									<Form.Control name="hourly_price" required='required' type='number' onChange={this.handleInputChange} />
								</InputGroup>
							</Col>
							<Col xs lg={2}>
								<Form.Label htmlFor="basic-url">Full Day Rate (required)</Form.Label>
								<InputGroup name="full_day_price" size="lg" >
									<InputGroup.Text>$</InputGroup.Text>
									<Form.Control name="full_day_price" required='required' type='number' onChange={this.handleInputChange} />
								</InputGroup>
							</Col>
						</Row>
						<Row className='offer-secondrow'>
							<Col xs lg={8}>
								<Form.Label htmlFor="basic-url">Description (required)</Form.Label>
								<InputGroup size="lg" >
									<InputGroup.Text id="basic-addon1" >< MdOutlineDescription /></InputGroup.Text>
									<Form.Control as="textarea" name='description' required='required' rows={5} placeholder='Describe your service ...' onChange={this.handleInputChange} />
								</InputGroup>
							</Col>
							<Col xs lg={4}>
								<Form.Label htmlFor="basic-url">Location</Form.Label>
								<OverlayTrigger placement="bottom" overlay={tooltip}>
									<InputGroup size="md">
										<InputGroup.Text id="basic-addon1"><MdLocationPin /></InputGroup.Text>
										<Form.Control type='text' value={this.state.city} disabled />
									</InputGroup>
								</OverlayTrigger>
								<Form.Group controlId="metodoPago">
									<Form.Label>Payment Method</Form.Label>
									<Form.Control as="select" >
										<option value="">Select payment method</option>
										<option value="cc">Credit card</option>
										<option value="transfer">Wire transfer</option>
									</Form.Control>
								</Form.Group>
								<Form.Label htmlFor="basic-url">Availability</Form.Label>
								<InputGroup size="lg" className='offer-checks'>
									<Form.Check type="switch" id="weekdays" label="Weekdays (8AM/6PM)" defaultChecked="true" />
									<Form.Check type="switch" id="weekends" label="Weekends (8AM/6PM)" />
									<Form.Check type="switch" id="holidays" label="Public Holidays" />
									<Form.Check type="switch" id="materials" label="Buy of materials" />
								</InputGroup>
							</Col>

						</Row>
						<Row>
							<Button variant="warning" size="lg" type="submit">
								Offer service
							</Button>
						</Row>
					</Form>
					<Row className='offer-services'>
						<h1>My services</h1>
						<Table className='offer-services-table table-hover'>
							<thead>
								<tr>
									<th>#</th>
									<th>Type</th>
									<th>Description</th>
									<th>Price per hour ($)</th>
									<th>Full Day ($)</th>
									<th>Last update</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{this.props.services.services.filter(service => service.provider == this.props.auth.user.id).map((service, id) => (
									<tr key={id}>
										<td>{service.id}</td>
										<td>{service.subcategory.name} ({service.subcategory.category})</td>
										<td>{service.description}</td>
										<td>$ {service.hourly_price}</td>
										<td>$ {service.full_day_price}</td>
										<td><TimestampConverter timestamp={service.updated} /></td>
										<td>
											<Button variant='outline-secondary'><FaPencilAlt /></Button>
											<Button variant='outline-danger' onClick={() => this.setState({ showModal: !this.state.showModal })}>X</Button>
											<DeleteConfirmationModal
												show={this.state.showModal}
												onHide={() => this.setState({ showModal: !this.state.showModal })}
												onDelete={() => this.handleDeleteClick(service.id)}
												toBeDeleted={[
													{ name: 'Service ID', value: service.id },
													{ name: 'Type', value: service.subcategory['name'] + ' (' + service.subcategory['category'] + ')' },
													{ name: 'Description', value: service.description },
												]}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Row>
				</Container>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		categories: state.categories,
		userdata: state.userdata.users,
		services: state.services,
	}
}

export default connect(mapStateToProps, { createService, getServices, deleteService })(Offer);