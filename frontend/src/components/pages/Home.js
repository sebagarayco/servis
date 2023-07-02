import React, { Component } from 'react'
import { connect } from 'react-redux';
// Actions
import { getUserData, getAllUsers } from '../../redux/actions/userdata';
// Bootstrap
import Spinner from 'react-bootstrap/Spinner';
// Pages
import Nav from '../layout/Nav';
import { Footer } from '../layout/Footer';
import HomeCards from './HomeCards';
import HomeSearch from './HomeSearch';


export class Home extends Component {

	componentDidMount() {
		this.props.getUserData();
		this.props.getAllUsers();
	}

	render() {
		return (
			<div>
				<Nav />
				<HomeSearch />
				<HomeCards />
				{/* <Footer /> */}
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




