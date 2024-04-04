import React, { Component } from 'react'
import Nav from '../layout/Nav';
// Redux
import axios from 'axios';
import { connect } from 'react-redux';
// Actions
import { createService, deleteService, getServices } from '../../redux/actions/services';
// Utils
import ServisSpinner from '../utils/ServisSpinner';
import TimestampConverter from '../utils/TimestampConverter';
import DeleteConfirmationModal from '../utils/DeleteConfirmationModal';
// Bootstrap
import { Container, Row, Col, Form, InputGroup, Button, Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
// Icons
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

export class Offer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			category: '',
			subcategory: '',
			description: '',
			hourly_price: '',
			full_day_price: '',
			modalVisibility: {}
		}
	};

	componentDidMount() {
		this.props.getServices()
	}

	handleDeleteClick = (service) => {
		// TODO: Handle comments
		console.log('Deleting service with ID: ', service);
		this.setState(prevState => ({
			modalVisibility: {
				...prevState.modalVisibility,
				[service.id]: true, // Set modal visibility for the clicked row's service ID to true
			},
		}));
	};

	onDelete = (serviceId) => {
		// TODO: Handle comments
		console.log('Deleting service with ID: ', serviceId);
		this.setState({ loading: true });
		this.props.deleteService(serviceId);
		this.setState(prevState => ({
			modalVisibility: {
				...prevState.modalVisibility,
				[serviceId]: false, // Set modal visibility for the deleted row's service ID to false
			},
		}));
		setTimeout(() => { this.setState({ loading: false }) }, 500); // Loading timeout
	};

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
		// TODO: Handle comments
		console.log('Selected ' + e.target.name + ' value: ' + e.target.value);
	}

	handleImageChange = (e) => {
		this.setState({
			image: e.target.files[0]
		});
	}

/* 	onSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		const { category, subcategory, description, hourly_price, full_day_price } = this.state;
		const provider = this.props.auth.user.id;
		const service = { category, subcategory, description, hourly_price, full_day_price, provider };
		// TODO: Handle comments
		console.log('Service to be created: ', service)
		this.props.createService(service);
		setTimeout(() => { this.setState({ loading: false }) }, 1500); // Loading timeout
	}; */

	onSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true });

		const formData = new FormData();
		formData.append('category', this.state.category);
		formData.append('subcategory', this.state.subcategory);
		formData.append('description', this.state.description);
		formData.append('hourly_price', this.state.hourly_price.toString()); // Ensure numeric values are converted to strings
		formData.append('full_day_price', this.state.full_day_price.toString()); // Ensure numeric values are converted to strings
		formData.append('provider', this.props.auth.user.id);
		if (this.state.image) {
			formData.append('image', this.state.image, this.state.image.name);
		}
		console.log('Service to be created: ', formData)
		this.props.createService(formData);
		setTimeout(() => { this.setState({ loading: false }) }, 1500);
	}


	render() {
		const tooltip = (
			<Tooltip id="tooltip">Default user location is used.</Tooltip>
		);

		const location = this.props.auth.user.location.properties.city + ' (' + this.props.auth.user.location.properties.province + ', ' + this.props.auth.user.location.properties.country + ')';
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
									<InputGroup.Text><MdAttachMoney /></InputGroup.Text>
									<Form.Control name="hourly_price" required='required' type='number' onChange={this.handleInputChange} />
								</InputGroup>
							</Col>
							<Col xs lg={2}>
								<Form.Label htmlFor="basic-url">Full Day Rate (required)</Form.Label>
								<InputGroup name="full_day_price" size="lg" >
									<InputGroup.Text><MdAttachMoney /></InputGroup.Text>
									<Form.Control name="full_day_price" required='required' type='number' onChange={this.handleInputChange} />
								</InputGroup>
							</Col>
						</Row>
						<Row className='offer-secondrow'>
							<Col xs lg={8}>
								<Form.Label htmlFor="basic-url">Description (required)</Form.Label>
								<InputGroup size="lg" >
									<InputGroup.Text id="basic-addon1" >< MdOutlineDescription /></InputGroup.Text>
									<Form.Control as="textarea" name='description' required='required' rows={8} placeholder="Describe the services you offer, including key features and benefits." onChange={this.handleInputChange} />
								</InputGroup>
							</Col>
							<Col xs lg={4}>
								<Form.Label htmlFor="basic-url">Location</Form.Label>
								<OverlayTrigger placement="bottom" overlay={tooltip}>
									<InputGroup size="md">
										<InputGroup.Text id="basic-addon1"><MdLocationPin /></InputGroup.Text>
										<Form.Control type='text' disabled value={this.props.auth ? location : 'N/A'} />
									</InputGroup>
								</OverlayTrigger>
								<hr />
								<Form.Group controlId="metodoPago">
									<Form.Label>Payment Method</Form.Label>
									<Form.Control as="select" >
										<option value="">Select payment method</option>
										<option value="cc">Credit card</option>
										<option value="transfer">Wire transfer</option>
									</Form.Control>
								</Form.Group>
								<hr />
								<Form.Group>
									<Form.Label>Service Image</Form.Label>
									<Form.Control className='form-control-lg' type="file" onChange={this.handleImageChange} />
								</Form.Group>
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
						{this.state.loading ?
							<ServisSpinner /> : (
								<Table className='offer-services-table table-hover'>
									<thead>
										<tr>
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
												<td>{service.subcategory.name} ({service.subcategory.category})</td>
												<td>{service.description}</td>
												<td>$ {service.hourly_price}</td>
												<td>$ {service.full_day_price}</td>
												<td><TimestampConverter timestamp={service.updated} /></td>
												<td>
													{/* <Button variant='outline-secondary'><FaPencilAlt /></Button> */}
													<Button variant='outline-danger' onClick={() => this.handleDeleteClick(service)}><MdOutlineDeleteForever /></Button>
													<DeleteConfirmationModal
														show={this.state.modalVisibility[service.id] || false}
														onHide={() => this.setState(prevState => ({
															modalVisibility: {
																...prevState.modalVisibility,
																[service.id]: false,
															},
														}))}
														onDelete={() => this.onDelete(service.id)}
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
							)}
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