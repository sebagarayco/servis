import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, onHide, onDelete, toBeDeleted }) => {
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Confirm Delete</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to delete this item?
				<br />
				<br />
				{toBeDeleted ?
					<ul>
						{toBeDeleted && toBeDeleted.map((item, id) => (
							<li key={id}>
								<strong>{item.name}: </strong>{item.value}
							</li>
						))}
					</ul>
					: null}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Cancel
				</Button>
				<Button variant="danger" onClick={onDelete}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteConfirmationModal;