import React from 'react';
// Bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
// Redux
import { connect } from 'react-redux';

const ProfileContractTable = ({ contracts }) => {
	return (
		<Table responsive>
			<thead>
				<tr>
					<th>Estado</th>
					<th>Detalle</th>
					<th>Precio Acordado</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{contracts.length > 0 ? (
					contracts.map(contract => (
						<tr key={contract.id}>
							<td>
								<Button
									size="sm"
									variant={
										contract.status === 'On-hold'
											? 'warning'
											: contract.status === 'In-progress'
												? 'success'
												: contract.status === 'Completed'
													? 'primary'
													: 'default'
									}
								>
									{contract.status}
								</Button>
							</td>
							<td>{contract.comments}</td>
							<td>${contract.amount}</td>
							<td>
								<Button size="sm" variant="outline-secondary"><FaPencilAlt /></Button>
								<Button size="sm" variant="outline-danger"><MdOutlineDeleteForever /></Button>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td>No hay servicios contratados.</td>
					</tr>
				)}
			</tbody>
		</Table >
	);
};

export default connect()(ProfileContractTable);
