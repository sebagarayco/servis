import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaPencilAlt } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
// Redux
import { connect, useSelector } from 'react-redux';
import ViewContractModal from '../utils/ViewContractModal';
import EditContractModal from '../utils/EditContractModal';

const ProfileContractRequest = ({ contracts }) => {
	const { auth } = useSelector(state => state);
	const [showViewModal, setShowViewModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedContract, setSelectedContract] = useState(null);
	const [selectedEditContract, setSelectedEditContract] = useState(null);
	const navigate = useNavigate();

	const handleEdit = (contract) => {
		// Muestra el modal cuando se hace clic en "Editar"
		setSelectedEditContract(contract);
		setShowEditModal(true);
	};

	const handleInfo = (contract) => {
		// Muestra el modal cuando se hace clic en "Info"
		setSelectedContract(contract);
		setShowViewModal(true);
	};

	const handleCloseModal = () => {
		// Cierra el modal
		setShowEditModal(false);
		setShowViewModal(false);
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
						<th>Servicio</th>
						<th>Precio</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{contracts.length > 0 ? (
						contracts.filter(contract => contract.provider === auth.user.id).map((contract, id) => (
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
								<td>{contract.service.description}</td>
								<td>$ {contract.amount}</td>
								<td>
									<Button size="sm" variant="outline-secondary" onClick={() => handleEdit(contract)}>
										<FaPencilAlt />
									</Button>
									<Button size="sm" variant="outline-info" onClick={() => handleInfo(contract)}>
										<HiOutlineInformationCircle />
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

			{/* Renderiza el componente Modal */}
			{selectedContract && (
				<ViewContractModal
					contract={selectedContract}
					show={showViewModal}
					handleClose={handleCloseModal}
				/>
			)}
			{selectedEditContract && (
				<EditContractModal
					contract={selectedEditContract}
					show={showEditModal}
					handleClose={handleCloseModal}
				/>
			)}
		</Container>
	);
};

export default connect()(ProfileContractRequest);
