import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaPencilAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
// Icons
import { MdOutlineDeleteForever } from "react-icons/md";
// Redux
import { connect, useSelector, useDispatch } from 'react-redux';
// Actions
import { deleteContract } from '../../redux/actions/contracts';
import ViewContractModal from '../utils/ViewContractModal';
import EditContractModal from '../utils/EditContractModal';
// Components
import DeleteConfirmationModal from '../utils/DeleteConfirmationModal';

const ProfileContractRequest = ({ contracts }) => {
	const auth = useSelector(state => state.auth);
	const [showViewModal, setShowViewModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedContract, setSelectedContract] = useState(null);
	const [selectedEditContract, setSelectedEditContract] = useState(null);
	const [modalVisibility, setModalVisibility] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// New state to hold the current comments for the selected contract
	const [currentComments, setCurrentComments] = useState([]);

	// When the selected contract changes (for example, when a new comment is added),
	// this effect updates the currentComments state with the latest comments.
	// It also ensures the selectedContract state is updated based on the latest contracts list.
	useEffect(() => {
		if (selectedContract) {
			const updatedContract = contracts.find(c => c.id === selectedContract.id);
			if (updatedContract) {
				setSelectedContract(updatedContract); // Update selectedContract with the latest info
				setCurrentComments(updatedContract.contract_comments || []); // Update comments
			}
		}
	}, [contracts, selectedContract]);

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

	const handleDeleteClick = (contract) => {
		// TODO: Handle comments
		setModalVisibility(prevState => ({
			...prevState.modalVisibility,
			[contract.id]: true,
		}));
	};

	const onDelete = (contractId) => {
		console.log('Contracts:', contracts);
		// TODO: Handle comments
		console.log('Deleting contract with ID: ', contractId);
		setLoading(true);
		dispatch(deleteContract(contractId));
		setModalVisibility(prevState => ({
			...prevState.modalVisibility,
			[contractId]: false,
		}));
		setTimeout(() => { setLoading(false) }, 500); // Loading timeout
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
						contracts.filter(contract => contract.provider.id === auth.user.id).map((contract, id) => (
							<tr key={contract.id}>
								<td>
									<Button
										size="md"
										variant={
											contract.status === 'En espera'
												? 'warning'
												: contract.status === 'En progreso'
													? 'success'
													: contract.status === 'Completado'
														? 'info'
														: contract.status === 'Cancelado'
															? 'secondary'
															: contract.status === 'Rechazado'
																? 'danger'
																: 'default'
										}
									>
										{contract.status}
									</Button>
								</td>
								<td>{contract.description}</td>
								<td>{contract.service.description}</td>
								<td><Button disabled variant='outline-dark'>
									$ {contract.amount}
								</Button>
								</td>
								<td>
									<Button size="md" variant="outline-secondary" onClick={() => handleEdit(contract)}>
										<FaPencilAlt />
									</Button>
									<Button size="md" style={{ marginLeft: '2px' }} variant="outline-info" onClick={() => handleInfo(contract)}>
										<IoEyeOutline />
									</Button>
									{contract.status === 'Rechazado' ? (
										<>
											<Button
												size="md"
												variant="outline-danger"
												onClick={() => handleDeleteClick(contract)}
												style={{ marginLeft: '2px' }}
											>
												<MdOutlineDeleteForever />
											</Button>
											<DeleteConfirmationModal
												show={modalVisibility[contract.id] || false}
												onHide={() => setModalVisibility(prevState => ({
													...prevState.modalVisibility,
													[contract.id]: false,
												}))}
												onDelete={() => onDelete(contract.id)}
												toBeDeleted={[
													{ name: 'Contract ID', value: contract.id },
													{ name: 'Type', value: contract.service.subcategory['name'] + ' (' + contract.service.subcategory['category'] + ')' },
													{ name: 'Description', value: contract.description },
												]}
											/>
										</>
									) : null}
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

			{selectedContract && (
				<ViewContractModal
					contract={selectedContract}
					comments={currentComments} 
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

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps, null)(ProfileContractRequest);
