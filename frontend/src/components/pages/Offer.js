import React, { Component } from 'react'
import Nav from '../layout/Nav';
// Redux
import { connect } from 'react-redux';
// Actions
import { createService, deleteService, getServices } from '../../redux/actions/services';
// Bootstrap
import { Container, Row, Col, Form, InputGroup, Button, Table } from 'react-bootstrap';
// Icons
import { MdHomeRepairService } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
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
		}
	};

	componentDidMount() {
		this.props.getServices();
	}

	async handleOnClick(service) {
		console.log("hoge!");
		if (await confirm("Are your sure?")) {
			console.log('Deleting service with ID: ', service)
			this.props.deleteService(service);
		} else {
			this.setState({ message: "No!" });
		}
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
		console.log('Selected ' + e.target.name + ' value: ' + e.target.value);
	}

	onSubmit = (e) => {
		e.preventDefault();
		const { category, subcategory, description, hourly_price, full_day_price } = this.state;
		const provider = this.props.auth.user.id;
		const service = { category, subcategory, description, hourly_price, full_day_price, provider };
		console.log('Service to be created: ', service)
		this.props.createService(service);
	};

	render() {
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
								<Form.Label htmlFor="basic-url">Category</Form.Label>
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
								<Form.Label htmlFor="basic-url">Subcategory</Form.Label>
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
								<Form.Label htmlFor="basic-url">Hourly Rate</Form.Label>
								<InputGroup name="hourly_price" size="lg" >
									<InputGroup.Text>$</InputGroup.Text>
									<Form.Control name="hourly_price" required='required' type='number' onChange={this.handleInputChange} />
								</InputGroup>
							</Col>
							<Col xs lg={2}>
								<Form.Label htmlFor="basic-url">Full Day Rate</Form.Label>
								<InputGroup name="full_day_price" size="lg" >
									<InputGroup.Text>$</InputGroup.Text>
									<Form.Control name="full_day_price" required='required' type='number' onChange={this.handleInputChange} />
								</InputGroup>
							</Col>
						</Row>
						<Row className='offer-secondrow'>
							<Col xs lg={9}>
								<Form.Label htmlFor="basic-url">Description</Form.Label>
								<InputGroup size="lg" >
									<InputGroup.Text id="basic-addon1" >< MdOutlineDescription /></InputGroup.Text>
									<Form.Control as="textarea" name='description' required='required' rows={5} placeholder='Describe your service ...' onChange={this.handleInputChange} />
								</InputGroup>
							</Col>
							<Col xs lg={3}>
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
									<Form.Check type="switch" id="materials" label="Include materials" />
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
						<Table>
							<thead>
								<tr>
									<th>#</th>
									<th>Category</th>
									<th>Description</th>
									<th>Hour ($)</th>
									<th>Full Day ($)</th>
									<th>Created at</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{this.props.services.services.filter(service => service.provider == this.props.auth.user.id).map((service, id) => (
									<tr key={id}>
										<td>{service.id}</td>
										<td>{service.subcategory.name}</td>
										<td>{service.description}</td>
										<td>{service.hourly_price}</td>
										<td>{service.full_day_price}</td>
										<td>{service.created}</td>
										<td>
											<Button variant='outline-warning'><FaPencilAlt /></Button>
											<Button variant='outline-danger' onClick={() => this.handleOnClick(service.id)}>X</Button>
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