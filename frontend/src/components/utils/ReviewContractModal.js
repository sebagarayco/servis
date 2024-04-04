import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addServiceReview } from '../../redux/actions/services';

const ReviewContractModal = ({ show, handleClose, contract }) => {
	const auth = useSelector((state) => state.auth);
	const [rating, setRating] = useState(0); // State for the rating
	const [review, setReview] = useState(''); // State for the comment
	const dispatch = useDispatch();

	const handleRatingChange = (event) => {
		setRating(parseInt(event.target.value, 10)); // Parse rating to integer
	};

	const handleReviewChange = (event) => {
		setReview(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const reviewData = {
			service: contract.service.id,
			service_reviews: [{
				rating,
				user: auth.user.id,
				review
			}],
		};
		console.log('Calling addServiceReview with this data: ', reviewData)
		dispatch(addServiceReview(contract.service.id, reviewData));
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Escribir Reseña</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="rating">
						<Form.Label>Calificación:</Form.Label>
						<Form.Control
							as="select"
							value={rating}
							onChange={handleRatingChange}
						>
							<option value={0}>Seleccionar...</option>
							<option value={1}>1 - Muy malo</option>
							<option value={2}>2 - Malo</option>
							<option value={3}>3 - Regular</option>
							<option value={4}>4 - Bueno</option>
							<option value={5}>5 - Excelente</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="comment">
						<Form.Label>Comentario:</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							value={review}
							onChange={handleReviewChange}
						/>
					</Form.Group>
					<br />
					<Button variant="warning" size='lg' type="submit">
						Enviar Reseña
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

const mapDispatchToProps = {
	addServiceReview,
};

export default connect(null, mapDispatchToProps)(ReviewContractModal);
