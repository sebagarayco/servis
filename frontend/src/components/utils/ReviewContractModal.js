import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addContractReview } from '../../redux/actions/contracts';

const ReviewContractModal = ({ show, handleClose, contract }) => {
	const auth = useSelector((state) => state.auth);
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState(''); 
	const dispatch = useDispatch();

	const handleRatingChange = (event) => {
		setRating(parseInt(event.target.value, 0)); // Parse rating to integer
	};

	const handleReviewChange = (event) => {
		setReview(event.target.value);
	};

	const getStarRating = (rating) => {
		const stars = '⭐️';
		return stars.repeat(rating);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const reviewData = {
			amount: contract.amount,
			service: contract.service.id,
			contract_reviews: [{
				rating,
				user: auth.user.id,
				review
			}],
		};
		console.log('Calling addServiceReview with this data: ', reviewData)
		dispatch(addContractReview(contract.id, reviewData));
		handleClose();
	};

	const userHasReviewed = () => {
		if (!contract.contract_reviews) {
			return false;
		}
		const userReview = contract.contract_reviews.find(
			(review) => review.user === auth.user.id
		);
		return userReview !== undefined;
	}

	return (
		<Modal show={show} onHide={handleClose} centered size='lg'>
			<Modal.Header closeButton>
				<Modal.Title>Escribir Reseña</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Image src='/static/reviewstars.jpg' alt='Review Stars' className='review-image' />
				{userHasReviewed() ? (
					<React.Fragment>
						<Alert variant='warning'>Ya has enviado una reseña para este contrato.</Alert>
						<blockquote className="blockquote mt-4">
							<p className="mb-2" style={{ fontStyle: 'italic', fontSize: '1.8rem' }}>{`"${contract.contract_reviews[0]?.review}"`}</p>
							<p>{getStarRating(contract.contract_reviews[0]?.rating)} el {new Date(contract.contract_reviews[0]?.created).toLocaleString('es-ES')}</p>
						</blockquote>
					</React.Fragment>
				) : (
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
				)}
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
	addContractReview,
};

export default connect(null, mapDispatchToProps)(ReviewContractModal);
