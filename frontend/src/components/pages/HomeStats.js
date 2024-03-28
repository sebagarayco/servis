import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class HomeStats extends Component {
	render() {
		// TODO: Handle comments
		console.log('Pase por HomeStats: ', this.props)
		return (
			<Row>
				<Col xs lg={3}>
					<h1>{this.props.users} usuarios</h1>
				</Col>
				<Col xs lg={3}>
					<h1>{this.props.categories} categorías</h1>
				</Col>
				<Col xs lg={3}>
					<h1>{this.props.services} servicios</h1>
				</Col>
			</Row>
		)
	}
}

export default HomeStats;