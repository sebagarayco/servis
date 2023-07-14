import React, { Component } from 'react'
import Nav from '../layout/Nav';
import { Footer } from '../layout/Footer';
// Redux
import { connect } from 'react-redux';
// Actions
import { getCategories } from '../../redux/actions/categories';
// Bootstrap
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
// Icons
import { MdHomeRepairService } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";

export class Offer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: '',
			subcategory: '',
		}
	};

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
		console.log('Selected ' + e.target.name + ' value: ' + e.target.value);
	}

	render() {
		return (
			<div>
				<Nav />
				<Container className='offer-container'>
					<Form className='offer-form'>
						<Row>
							<Col sm={15}>
								<h1>Time to offer!</h1>
							</Col>
						</Row>
						<Row className='offer-toprow'>
							<Col xs lg={4}>
								<Form.Label htmlFor="basic-url">Category</Form.Label>
								<InputGroup size="lg" >
									<InputGroup.Text id="basic-addon1"><MdHomeRepairService /></InputGroup.Text>
									<Form.Select name='category' defaultValue={'default'} onChange={this.handleInputChange}>
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
									<Form.Select name='subcategory' defaultValue={'default'} onChange={this.handleInputChange}>
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
							<Col xs lg={4}>
								<Form.Label htmlFor="basic-url">Hourly Rate</Form.Label>
								<InputGroup size="lg" >
									<InputGroup.Text id="basic-addon1">$</InputGroup.Text>
									<Form.Control type='number' />
								</InputGroup>
							</Col>
						</Row>
						<Row className='offer-secondrow'>
							<Col xs lg={9}>
								<Form.Label htmlFor="basic-url">Description</Form.Label>
								<InputGroup size="lg" >
									<InputGroup.Text id="basic-addon1" >< MdOutlineDescription /></InputGroup.Text>
									<Form.Control as="textarea" name='description' rows={5} placeholder='Describe your service ...' />
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
					<Row>
						<h1>Ble</h1>
					</Row>
				</Container>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		categories: state.categories,
		userdata: state.userdata.users,
		services: state.services,
	}
}

export default connect(mapStateToProps, {})(Offer);