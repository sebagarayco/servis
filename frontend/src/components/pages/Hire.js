import React, { Component } from 'react'
// Layout
import Nav from '../layout/Nav';
// Redux
import { connect } from 'react-redux';
// Pages
import Map from './Map';
import HireServiceList from './HireServiceList';
// Actions
import { getCategories } from '../../redux/actions/categories';
import { getServices } from '../../redux/actions/services';
// Bootstrap
import { Container, Row, Col, Form, InputGroup, Button, Table } from 'react-bootstrap';
// Icons
import { MdHomeRepairService } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";

export class Hire extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			showAll: true,
			category: 'showAll',
			subcategory: '',
			name: "",
			address: {
				street: "",
				city: "",
				state: "",
				country: "",
				postalcode: ""
			},
			categoriesWithCount: [], 
		};
	};

	handleInputChange = (e) => {
		if (e.target.value === "showAll") {
			this.setState({ showAll: true, category: "showAll" });
		} else {
			this.setState({ showAll: false, [e.target.name]: e.target.value });
		}
		console.log("Selected " + e.target.name + " value: " + e.target.value);
	};

	handleInputChange = (e) => {
		if (e.target.value === 'showAll') {
			this.setState({ showAll: true });
			this.setState({
				[e.target.name]: e.target.value,
			});
		} else {
			this.setState({ showAll: false });
			this.setState({ [e.target.name]: e.target.value, });
		}
		// TODO: Handle comments
		console.log('Selected ' + e.target.name + ' value: ' + e.target.value);
	}

	componentDidMount() {
		this.props.getCategories();
	}

	componentDidUpdate(prevProps) {
		// This checks if categories or services have been updated
		if (prevProps.categories !== this.props.categories || prevProps.services !== this.props.services) {
			this.updateCategoriesWithCount();
		}
	}

	updateCategoriesWithCount = () => {
		// Make sure both categories and services are loaded
		if (this.props.categories.categories && this.props.services.services) {
			console.log("Categories:", this.props.categories.categories);
			console.log("Services:", this.props.services.services);

			const categoriesWithCount = this.props.categories.categories.map(category => {
				const count = this.props.services.services.filter(service => {
					console.log(`Matching: ${service.category} with ${category.name}`);
					return service.subcategory.category === category.name;
				}).length;
				console.log(`Count for ${category.name}:`, count);
				return { ...category, count };
			});

			this.setState({ categoriesWithCount });
		}
	}

	onChange = (e) => {
		const { address } = this.state;
		address[e.target.name] = e.target.value;
		// TODO: Handle comments
		console.log(address)
		this.setState({ address });
	};

	getCurrentCityName(position) {
		this.setState({ coords: [data[0].lat, data[0].lon] });

		let url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2" +
			"&lat=" + this.state.coords[0] + "&lon=" + this.state.coords[1];

		fetch(url, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => this.setState({ name: data.display_name }));
	}

	submitHandler(e) {
		e.preventDefault();
		// TODO: Handle comments
		console.log('SUBMIT HANDLER: ', e);

		let url = `https://nominatim.openstreetmap.org/search?
		street=${this.state.address.street}
		&city=${this.state.address.city}
		&state=${this.state.address.state}
		&country=${this.state.address.country}
		&postalcode=${this.state.address.postalcode}&format=json`;

		fetch(url, {
			method: "GET",
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Something went wrong');
			})
			.then(
				(data) => {
					this.setState({ name: data[0].display_name });
					this.setState({ coords: [data[0].lat, data[0].lon] });
				}
			).catch((error) => {
				alert("Error in your input; unable to find the position" , error);
			});
	}

	render() {
		return (
			<div>
				<Nav />
				<Container className='hire-container'>
					<Form >
						<Row className="hire-row">
							<h1>Contratar servicios</h1>
							<Col xs lg={4}>
								<Form.Label htmlFor="basic-url">Category</Form.Label>
								<InputGroup size="lg" className="mb-3">
									<InputGroup.Text id="basic-addon1"><MdHomeRepairService /></InputGroup.Text>
									<Form.Select name='category' defaultValue={'showAll'} onChange={this.handleInputChange}>
										<option value="showAll">All categories</option>
										{this.state.categoriesWithCount.map((category, id) => (
											<option key={id} value={category.name}>
												{category.name} ({category.count})
											</option>
										))}
									</Form.Select>
								</InputGroup>
							</Col>
							<Col xs lg={4} >
								<Form.Label htmlFor="basic-url">Subcategory</Form.Label>
								<InputGroup size="lg" className="mb-3">
									<InputGroup.Text id="basic-addon1"><MdOutlineCleaningServices /></InputGroup.Text>
									<Form.Select name='subcategory' defaultValue={'default'} onChange={this.handleInputChange}>
										<option value="default" disabled>--- Select category ---</option>
										{this.props.categories.categories.filter(category => category.name === this.state.category).map((category, id) => (
											category.subcategories.map((subcategory, id) => (
												<option
													key={id}
													value={subcategory.name}
												>{subcategory.name} ({category.name})
												</option>
											))
										))}
									</Form.Select>
								</InputGroup>
							</Col>
							<Col xs lg={3}>
								<Form.Label htmlFor="basic-url">City</Form.Label>
								<InputGroup size="lg" className="mb-3">
									<InputGroup.Text id="basic-addon1"><MdLocationPin /></InputGroup.Text>
									<Form.Control
										type='text'
										name='city'
										placeholder='--- Enter City ---'
										value={this.state.address.city}
										onChange={this.onChange}
									/>
								</InputGroup>
							</Col>
							<Col xs lg={1}>
								<br />
								<Button className='btn-search'
									type='submit'
									variant='secondary'
									onClick={(e) => this.submitHandler(e)}>
									Search
								</Button>
							</Col>
						</Row>
					</Form>
					<Map category={this.state.category} coordinates={this.state.coords}/>
					<Row className='hire-services'>
						<h1>Servicios disponibles</h1>
						<h5>{this.props.services.services.length} servicios disponibles en total. Ajustar la búsqueda.</h5>
						<HireServiceList services={this.state.showAll ? this.props.services.services : this.props.services.services.filter(service => service.subcategory.category === this.state.category)} />
					</Row>
				</Container >
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		categories: state.categories,
		services: state.services,
		userdata: state.userdata
	}
}

export default connect(mapStateToProps, { getCategories, getServices })(Hire);