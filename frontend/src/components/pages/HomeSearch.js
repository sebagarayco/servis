import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
// Actions
import { getCategories } from '../../redux/actions/categories';
import { getServices } from '../../redux/actions/services';
// Redux
import { connect } from 'react-redux';
// Pages
import Map from './Map';
import HomeModal from './HomeModal';
// Icons
import { MdHomeRepairService } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import HomeStats from './HomeStats';

export class HomeSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			category: '',
			subcategory: '',
			name: "",
			coords: [-41.13, -71.3],
			address: {
				street: "",
				city: "",
				state: "",
				country: "",
				postalcode: ""
			}
		};
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
		console.log('Selected ' + e.target.name + ' value: ' + e.target.value);
	}

	componentDidMount() {
		this.props.getCategories();
		this.props.getServices();
	}

	onChange = (e) => {
		const { address } = this.state;
		address[e.target.name] = e.target.value;
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
		console.log('SUBMIT HANDLER: ', e);

		let url = `https://nominatim.openstreetmap.org/search?
		street=${this.state.address.street}
		&city=${this.state.address.city}
		&state=${this.state.address.state}
		&country=${this.state.address.country}
		&postalcode=${this.state.address.postalcode}&format=json`;

		fetch(url, {
			method: "POST",
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
				alert("Error in your input; unable to find the position");
			});;
	}

	render() {
		return (
			<Container className='home-container'>
				<Form >
					<Row>
						<Col sm={15}>
							<Image
								fluid='true'
								src="static/banner.jpg"
							/>
						</Col>
					</Row>
					<HomeStats categories={this.props.categories.categories.length}
						users={this.props.userdata.length}
						services={this.props.services && this.props.services.services.length} />
					<Row className="home-row">
						<h1>¿Qué servicio estás buscando?</h1>
						<div className='home-container-tab'>
							<HomeModal />
						</div>
						<Col xs lg={4}>
							<Form.Label htmlFor="basic-url">Category</Form.Label>
							<InputGroup size="lg" className="mb-3">
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
				<Map coords={this.state.coords} category={this.state.category} />
			</Container >
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

export default connect(mapStateToProps, { getCategories, getServices })(HomeSearch)