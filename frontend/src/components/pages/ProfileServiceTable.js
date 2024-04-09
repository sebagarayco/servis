import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const ProfileServiceTable = ({ services, userId, publishEnabled = true }) => {
	const auth = useSelector(state => state.auth);
	const [modalVisibility, setModalVisibility] = useState({});
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDeleteClick = (service) => {
		console.log('Deleting service with ID: ', service);
		setModalVisibility(prevState => ({
			...prevState.modalVisibility,
			[service.id]: true,
		}));
	};

	const onDelete = (serviceId) => {
		console.log('Deleting service with ID: ', serviceId);
		setLoading(true);
		dispatch(deleteService(serviceId));
		setModalVisibility(prevState => ({
			...prevState.modalVisibility,
			[serviceId]: false,
		}));
		setTimeout(() => { setLoading(false) }, 500);
	};

	const handleNewServiceClick = () => {
		navigate('/offer');
	};

	const filteredServices = userId ?
		services.filter(service => service.provider === userId)
		: services.filter(service => service.provider === auth.user.id);

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
					{filteredServices.length > 0 ? (
						filteredServices.map((service, id) => (
							<tr key={service.id}>
								<td>{service.subcategory.name} ({service.subcategory.category})</td>
								<td>{service.description}</td>
								<td>
									<Button disabled variant='outline-dark'>
										$ {service.hourly_price}
									</Button> / <Button disabled variant='outline-dark'>
										${service.full_day_price}
									</Button>
								</td>
								<td>
									{publishEnabled ? (
										<>
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
										</>
									) : (
										<>
											<Button size="md" variant="outline-warning" className='public-profile-hire'>
												<Link to={`/hire`}>Hire</Link>
											</Button>
										</>
									)}
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
			{publishEnabled && (
				<Button size="lg" variant="outline-warning" onClick={handleNewServiceClick}>
					Publicar Servicio
				</Button>
			)}
		</Container>
	);
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps, null)(ProfileServiceTable);
