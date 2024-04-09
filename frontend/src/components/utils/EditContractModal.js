import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Redux
import { connect, useDispatch } from 'react-redux';
// Actions
import { updateContract } from '../../redux/actions/contracts';

const EditContractModal = ({ contract, show, handleClose }) => {
	const dispatch = useDispatch();

	const [editedData, setEditedData] = useState({
		status: contract.status,
		comments: contract.comments,
		amount: contract.amount,
		id: contract.id,
	});

	const [errors, setErrors] = useState({}); 

	const validateForm = () => {
		let tempErrors = {};
		tempErrors.comments = editedData.comments ? "" : "Este campo es obligatorio.";
		tempErrors.amount = editedData.amount ? "" : "Este campo es obligatorio.";
		setErrors(tempErrors);
		return Object.keys(tempErrors).every(x => tempErrors[x] === "");
	};

	const handleSave = () => {
		if (validateForm()) {
			const updatedContractData = {
				...editedData,
				service: contract.service.id,
				contract_comments: [{
					comment: `ESTADO ACTUALIZADO de "${contract.status}" a "${editedData.status}". Notas del cambio: ${editedData.comments}`,
					user: contract.provider.id
				}],
			};
			console.log('Contract: ', contract)
			console.log('Updated Contract Data:', editedData.id, updatedContractData);
			dispatch(updateContract(editedData.id, updatedContractData)); 
			handleClose();
		}
	};

	const stateOptions = ["En espera", "En progreso", "Completado", "Rechazado", "Cancelado"].filter(state => state !== contract.status.name).map(state => (
		<option key={state} value={state}>{state}</option>
	));

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Editar Contrato - ID: #{contract.id}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>Estado actual:</Form.Label>
						<Form.Control
							type="text"
							disabled
							defaultValue={contract.status}
						/>
					</Form.Group>
					<hr />
					<Form.Group>
						<Form.Label>Nuevo estado:</Form.Label>
						<Form.Select
							defaultValue={'default'}
							onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
						>
							<option value="default" disabled>--- Seleccionar estado ---</option>
							{stateOptions}
						</Form.Select>
						<Form.Text id="passwordHelpBlock" muted>
							En Espera: Pendiente de aprobación por el proveedor del servicio<br />
							En Progreso: El proveedor aprueba realizar el trabajo<br />
							Completado: El proveedor finalizó el trabajo<br />
							Rechazado: El proveedor rechaza realizar el trabajo<br />
							Cancelado: El proveedor cancela el trabajo<br />
						</Form.Text>
					</Form.Group>
					<hr />
					<Form.Group>
						<Form.Label>Razón de cambio de estado:</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							onChange={(e) => setEditedData({ ...editedData, comments: e.target.value })}
						/>
						<Form.Text className="text-danger">{errors.comments}</Form.Text>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
				<Button variant="warning" onClick={handleSave}>
					Actualizar Estado
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default connect(null, { updateContract })(EditContractModal);
