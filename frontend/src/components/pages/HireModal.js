import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaFileContract } from 'react-icons/fa';

const HireModal = ({ service, onHide, onSubmit }) => {
	const { auth } = useSelector(state => state);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [comments, setComments] = useState('');

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePhoneChange = (e) => {
		setPhone(e.target.value);
	};

	const handleCommentsChange = (e) => {
		setComments(e.target.value);
	};

	const handlePhotoChange = (e) => {
		const selectedPhoto = e.target.files[0];
		setPhoto(selectedPhoto);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Prepare the hire data
		const hireData = {
			name,
			email,
			phone,
			comments
		};
		// Call the onSubmit prop and pass the hireData
		onSubmit(hireData);
	};

	return (
		<Modal
			size="lg"
			show={true}
			onHide={onHide}
			centered
			className='hire-modal'
		>
			<Modal.Header closeButton>
				<Modal.Title>Hire Service Provider</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Modal.Title>Provider</Modal.Title>
				<Form onSubmit={handleFormSubmit}>
					<Form.Group controlId="service">
						<Form.Label>Service Name</Form.Label>
						<Form.Control
							type="text"
							value={service.description + ' (' + service.subcategory.name + ')'}
							readOnly
							disabled
						/>
					</Form.Group>
					<Form.Group controlId="username">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							value={service.user.username}
							readOnly
							disabled
						/>
					</Form.Group>
					<Form.Group controlId="first_name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={service.user.first_name + ' ' + service.user.last_name}
							readOnly
							disabled
						/>
					</Form.Group>
					<Form.Group controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							value={service.user.email}
							readOnly
							disabled
						/>
					</Form.Group>
					<Form.Group controlId="phone">
						<Form.Label>Phone Number</Form.Label>
						<Form.Control
							type="tel"
							value={service.user.phone}
							readOnly
							disabled
						/>
					</Form.Group>
					<hr />
					<Modal.Title>My details</Modal.Title>
					<Form.Group controlId="name">
						<Form.Label>Your Name</Form.Label>
						<Form.Control
							type="text"
							value={auth.user.first_name + ' ' + auth.user.last_name}
							onChange={handleNameChange}
						/>
					</Form.Group>
					<Form.Group controlId="email">
						<Form.Label>Your Email</Form.Label>
						<Form.Control
							type="email"
							value={auth.user.email}
							onChange={handleEmailChange}
						/>
					</Form.Group>
					<Form.Group controlId="phone">
						<Form.Label>Your Phone Number</Form.Label>
						<Form.Control
							type="tel"
							value={auth.user.phone}
							onChange={handlePhoneChange}
						/>
					</Form.Group>
					<Form.Group controlId="photo">
						<Form.Label>Upload Photo</Form.Label>
						<Form.Control
							type="file"
							accept="image/*"
							onChange={handlePhotoChange}
						/>
					</Form.Group>
					<Form.Group controlId="comments">
						<Form.Label>Comments</Form.Label>
						<Form.Control
							as="textarea"
							rows={4}
							value={comments}
							onChange={handleCommentsChange}
							autoFocus
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Cancel
				</Button>
				<Button variant="warning" onClick={handleFormSubmit}>
					<FaFileContract /> Hire
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default HireModal;
