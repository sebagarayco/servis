import React, { Component } from 'react'
import { connect } from 'react-redux';
// Actions
import { getUserData, getAllUsers } from '../../redux/actions/userdata';
// Bootstrap
import Spinner from 'react-bootstrap/Spinner';
// Pages
import Nav from '../layout/Nav';
import HomeSearch from './HomeSearch';
import ServisSpinner from '../utils/ServisSpinner';
import HomeServices from './HomeServices';
import HomeReviews from './HomeReviews';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1000);

		this.props.getAllUsers();
	}

	render() {
		return (
			<div>
				<Nav />
				{this.state.loading ? (
					<ServisSpinner />
				) : (
						<>
						<HomeSearch />
						<HomeServices />
							<HomeReviews />
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

export default connect(mapStateToProps, { getAllUsers })(Home);