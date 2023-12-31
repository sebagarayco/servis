import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditContractModal = ({ contract, show, handleClose }) => {
	const [editedData, setEditedData] = useState({
		// Inicializa el estado con los datos del contrato
		// Esto te permitirá editar los datos en el modal
		status: contract.status,
		comments: contract.comments,
		amount: contract.amount,
	});

	const handleSave = () => {
		// Implementa la lógica para guardar los datos editados
		// Puedes llamar a una función de Redux para manejar esto
		// y cerrar el modal después de guardar.
		// Ejemplo: saveEditedData(editedData);
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Editar Servicio Contratado</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/* Aquí coloca los campos de edición dentro del formulario */}
				{/* Ejemplo: */}
				<label>Estado:</label>
				<input
					type="text"
					value={editedData.status}
					onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
				/>
				<label>Detalle:</label>
				<input
					type="text"
					value={editedData.comments}
					onChange={(e) => setEditedData({ ...editedData, comments: e.target.value })}
				/>
				<label>Precio Acordado:</label>
				<input
					type="text"
					value={editedData.amount}
					onChange={(e) => setEditedData({ ...editedData, amount: e.target.value })}
				/>
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
