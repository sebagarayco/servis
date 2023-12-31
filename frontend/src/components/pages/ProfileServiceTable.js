import React from 'react';
// Bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// Redux
import { connect } from 'react-redux';

const ProfileServiceTable = ({ services }) => {
	return (
		<Table responsive>
			{services.length > 0 ? (
				<thead>
					<tr>
						<th>Servicio</th>
						<th>Categoría</th>
						<th>Creado</th>
					</tr>
				</thead>
			) : (
				<thead>
					<tr>
						<th>No hay servicios ofrecidos.</th>
					</tr>
				</thead>
			)}
		</Table>
	);
};

export default connect()(ProfileServiceTable);
