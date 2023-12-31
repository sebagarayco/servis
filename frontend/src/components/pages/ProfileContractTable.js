import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
// Redux
import { connect, useSelector } from 'react-redux';
import EditContractModal from '../utils/EditContractModal';

const ProfileContractTable = ({ contracts }) => {
	const { auth } = useSelector(state => state);
	const [showModal, setShowModal] = useState(false);
	const [selectedContract, setSelectedContract] = useState(null);
	const navigate = useNavigate();

	const handleEdit = (contract) => {
		// Muestra el modal cuando se hace clic en "Editar"
		setSelectedContract(contract);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		// Cierra el modal
		setShowModal(false);
	};

	const handleNewServiceClick = () => {
		// Redirect to "/hire" when the button is clicked
		navigate('/hire');
	};

	return (
		<Container>
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
						contracts.filter(contract => contract.consumer === auth.user.id).map((contract, id) => (
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
									<Button size="sm" variant="outline-secondary" onClick={() => handleEdit(contract)}>
										<FaPencilAlt />
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="4" className="center-content">No hay servicios contratados.</td>
						</tr>
					)}
				</tbody>
				<tfoot>
					<div>
						<Button size="sm" variant="outline-secondary" onClick={handleNewServiceClick}>
							Contratar Servicio
						</Button>
					</div>
				</tfoot>
			</Table>

			{/* Renderiza el componente Modal */}
			{selectedContract && (
				<EditContractModal
					contract={selectedContract}
					show={showModal}
					handleClose={handleCloseModal}
				/>
			)}
		</Container>
	);
};

export default connect()(ProfileContractTable);
