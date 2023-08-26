import React, { Component } from 'react'
import { connect } from 'react-redux';
// Actions
import { getUserData, getAllUsers } from '../../redux/actions/userdata';
// Bootstrap
import Spinner from 'react-bootstrap/Spinner';
// Pages
import Nav from '../layout/Nav';
import HomeCards from './HomeCards';
import HomeSearch from './HomeSearch';
import ServisSpinner from '../utils/ServisSpinner';
import HomeServices from './HomeServices';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	componentDidMount() {
		// Simulate loading for 1.5 seconds
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1500);

		this.props.getUserData();
		this.props.getAllUsers();
	}

	render() {
		return (
			<div>
				{this.state.loading ? (
					<ServisSpinner />
				) : (
					<>
						<Nav />
						<HomeSearch />
						<HomeServices />
						<HomeCards />
					</>
				)
				}
			</div >
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		user: state.user,
	};
};

export default connect(mapStateToProps, { getUserData, getAllUsers })(Home);