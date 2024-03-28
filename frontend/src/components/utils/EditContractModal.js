import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditContractModal = ({ contract, show, handleClose, saveEditedContract }) => {
	const [editedData, setEditedData] = useState({
		status: contract.status,
		comments: contract.comments,
		amount: contract.amount,
		id: contract.id,
	});

	const [errors, setErrors] = useState({}); // Nuevo estado para manejar errores

	const validateForm = () => {
		let tempErrors = {};
		// Aquí puedes añadir todas las validaciones que necesites
		tempErrors.comments = editedData.comments ? "" : "Este campo es obligatorio.";
		tempErrors.amount = editedData.amount ? "" : "Este campo es obligatorio.";
		// Aquí podrías añadir una validación más específica para el monto, por ejemplo, que sea un número
		setErrors(tempErrors);
		// Retorna true si el objeto tempErrors no tiene ninguna propiedad, lo que significa que no hay errores
		return Object.keys(tempErrors).every(x => tempErrors[x] === "");
	};

	const handleSave = () => {
		if (validateForm()) {
			saveEditedContract(editedData); // Suponiendo que saveEditedContract es la acción de Redux para guardar los datos
			handleClose();
		}
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Editar Contrato - ID: #{contract.id}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>Estado:</Form.Label>
						<Form.Control
							aria-label="Estado"
							type="text"
							disabled
							defaultValue={editedData.status}
							onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}>
						</Form.Control>
						<Form.Text id="passwordHelpBlock" muted>
							On-hold: Pendiente de aprobación por el proveedor del servicio<br />
							In-progress: El proveedor aprueba realizar el trabajo<br />
							Completed: El proveedor finalizó el trabajo<br />
						</Form.Text>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
				<Button variant="primary" onClick={handleSave}>
					Guardar Cambios
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditContractModal;