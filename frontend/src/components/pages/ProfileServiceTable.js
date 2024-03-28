import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// Icons
import { MdOutlineDeleteForever } from "react-icons/md";
// Actions
import { deleteService } from '../../redux/actions/services';
// Redux
import { connect, useSelector, useDispatch } from 'react-redux';
// Components
import DeleteConfirmationModal from '../utils/DeleteConfirmationModal';

const ProfileServiceTable = ({ services }) => {
	const auth = useSelector(state => state.auth);
	const [modalVisibility, setModalVisibility] = useState({});
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDeleteClick = (service) => {
		// TODO: Handle comments
		console.log('Deleting service with ID: ', service);
		setModalVisibility(prevState => ({
			...prevState.modalVisibility,
			[service.id]: true, // Set modal visibility for the clicked row's service ID to true
		}));
	};

	const onDelete = (serviceId) => {
		// TODO: Handle comments
		console.log('Deleting service with ID: ', serviceId);
		setLoading(true);
		dispatch(deleteService(serviceId));
		setModalVisibility(prevState => ({
			...prevState.modalVisibility,
			[serviceId]: false, // Set modal visibility for the clicked row's service ID to true
		}));
		setTimeout(() => { setLoading(false) }, 500); // Loading timeout
	};

	const handleNewServiceClick = () => {
		// Redirect to "/offer" when the button is clicked
		navigate('/offer');
	};

	return (
		<Container>
			<Table responsive>
				<thead>
					<tr>
						<th>Categoría</th>
						<th>Detalle</th>
						<th>Precio</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{services.length > 0 ? (
						services.filter(service => service.provider.id === auth.user.id).map((service, id) => (
							<tr key={service.id}>
								<td>{service.subcategory.name} ({service.subcategory.category})</td>
								<td>{service.description}</td>
								<td>${service.hourly_price} / ${service.full_day_price}</td>
								<td>
									<Button size="md" variant="outline-danger" onClick={() => handleDeleteClick(service)}>
										<MdOutlineDeleteForever />
									</Button>
									<DeleteConfirmationModal
										show={modalVisibility[service.id] || false}
										onHide={() => setModalVisibility(prevState => ({
											...prevState.modalVisibility,
											[service.id]: false,
										}))}
										onDelete={() => onDelete(service.id)}
										toBeDeleted={[
											{ name: 'Service ID', value: service.id },
											{ name: 'Type', value: service.subcategory['name'] + ' (' + service.subcategory['category'] + ')' },
											{ name: 'Description', value: service.description },
										]}
									/>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="4" className="center-content">No hay servicios publicados.</td>
						</tr>
					)}
				</tbody>
			</Table>
			<Button size="lg" variant="outline-warning" onClick={handleNewServiceClick}>
				Publicar Servicio
			</Button>
		</Container>
	);
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps, null)(ProfileServiceTable);