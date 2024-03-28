import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { IoEyeOutline } from "react-icons/io5";
// Redux
import { connect, useSelector } from 'react-redux';
import EditContractModal from '../utils/EditContractModal';

const ProfileContractTable = ({ contracts }) => {
	const auth = useSelector(state => state.auth);
	const [showModal, setShowModal] = useState(false);
	const [selectedEditContract, setSelectedEditContract] = useState(null);
	const navigate = useNavigate();

	const handleEdit = (contract) => {
		// Muestra el modal cuando se hace clic en "Editar"
		setSelectedEditContract(contract);
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
						<th>Categoría</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{contracts.length > 0 ? (
						contracts.filter(contract => contract.consumer.id === auth.user.id).map((contract, id) => (
							<tr key={contract.id}>
								<td>
									<Button
										size="md"
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
								<td>{contract.description}</td>
								<td>{contract.service.subcategory.name} ({contract.service.subcategory.category})</td>
								<td>
									<Button size="md" variant="outline-info" onClick={() => handleEdit(contract)}>
										<IoEyeOutline />
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
			</Table>
			<Button size="lg" variant="outline-warning" onClick={handleNewServiceClick}>
				Contratar Servicio
			</Button>

			{/* Renderiza el componente Modal */}
			{selectedEditContract && (
				<EditContractModal
					contract={selectedEditContract}
					show={showModal}
					handleClose={handleCloseModal}
				/>
			)}
		</Container>
	);
};

export default connect()(ProfileContractTable);
