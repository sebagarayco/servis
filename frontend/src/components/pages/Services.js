import React, { Component } from 'react'
import Nav from '../layout/Nav';
import { Footer } from '../layout/Footer';
import ServisSpinner from '../utils/ServisSpinner';

export class Services extends Component {
	render() {
		return (
			<div>
				<Nav />
				<h1>Services</h1>
			</div>
		)
	}
}

export default Services