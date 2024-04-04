import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { IoEyeOutline } from "react-icons/io5";
// Redux
import { connect, useSelector } from 'react-redux';
import EditContractModal from '../utils/EditContractModal';
import ViewContractModal from '../utils/ViewContractModal';
import ReviewContractModal from '../utils/ReviewContractModal'; 

const ProfileContractTable = ({ contracts }) => {
	const auth = useSelector(state => state.auth);
	const [showViewModal, setShowViewModal] = useState(false);
	const [showReviewModal, setShowReviewModal] = useState(false); 
	const [selectedContract, setSelectedContract] = useState(null);
	const navigate = useNavigate();
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
		setSelectedContract(contract);
		setShowViewModal(true);
	};

	const handleCloseModal = () => {
		// Cierra el modal
		setShowViewModal(false);
	};

	const handleReview = (contract) => {
		// Show review modal when "Review" button is clicked
		setSelectedContract(contract);
		setShowReviewModal(true);
	};

	const handleCloseReviewModal = () => {
		// Close review modal
		setShowReviewModal(false);
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
						<th>Proveedor</th>
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
								<td>{contract.service.subcategory.name} ({contract.service.subcategory.category})</td>
								<td>
									<Link className='contract-table-link' to={`/profile/${contract.provider.id}`}>
										<strong>{contract.provider.first_name} {contract.provider.last_name}</strong>
									</Link>
								</td>
								<td>
									<Button size="md" variant="outline-info" onClick={() => handleEdit(contract)}>
										<IoEyeOutline />
									</Button>
									{contract.status === 'Completado' && (
										<Button size="md" variant="light" style={{ marginLeft: '5px', borderColor: '#ffc107' }} onClick={() => handleReview(contract)}>
											⭐️
										</Button>
									)}
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

			{selectedContract && (
				<ViewContractModal
					contract={selectedContract}
					comments={currentComments} 
					show={showViewModal}
					handleClose={handleCloseModal}
				/>
			)}

			{selectedContract && (
				<ReviewContractModal
					contract={selectedContract}
					show={showReviewModal}
					handleClose={handleCloseReviewModal}
				/>
			)}
		</Container>
	);
};

export default connect()(ProfileContractTable);
