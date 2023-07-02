import React, { Component } from 'react'
// Bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// Redux
import { connect } from 'react-redux';

export class ProfilePRealizados extends Component {
	render() {
		return (
			<Table responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td><Button>Ver</Button></td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
						<td><Button>Ver</Button></td>
					</tr>
					<tr>
						<td>3</td>
						<td colSpan={2}>Larry the Bird</td>
						<td>@twitter</td>
						<td><Button>Ver</Button></td>
					</tr>
				</tbody>
			</Table>
		)
	}
}

const mapStateToProps = state => ({
	orders: state.auth,
});

export default connect(mapStateToProps, null)(ProfilePRealizados);