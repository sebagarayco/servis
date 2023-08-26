import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaFileContract } from 'react-icons/fa';
// Bootstrap
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
// Icons
import { GrUserWorker } from 'react-icons/gr';
import { BiCategoryAlt, BiUser } from 'react-icons/bi';
import { RiStarSFill } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdOutlineAttachMoney } from 'react-icons/md';

const HireModal = ({ service, onHide, onSubmit }) => {
	const { auth } = useSelector(state => state);
	const [comments, setComments] = useState('');
	const [budget, setBudget] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	// Check if all required fields are filled
	const isFormValid = () => {
		return (
			comments.trim() !== '' &&
			budget > 0 &&
			startDate !== '' &&
			endDate !== ''
		);
	};

	const handleCommentsChange = (e) => {
		setComments(e.target.value);
	};

	const handleBudgetChange = (e) => {
		setBudget(e.target.value);
	};

	const handlePhotoChange = (e) => {
		const selectedPhoto = e.target.files[0];
		setPhoto(selectedPhoto);
	};

	const handleStartDateChange = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDateChange = (e) => {
		setEndDate(e.target.value);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		if (!isFormValid()) {
			return; // Don't submit if the form is not valid
		}

		// Prepare the hire data
		const hireData = {
			consumer: auth.user,
			provider: service.user,
			budget,
			comments,
			startDate,
			endDate,
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
				<Modal.Title>Service Details</Modal.Title>
				<Form noValidate validated={true} onSubmit={handleFormSubmit}>
					<Row>
						<Col>
							<Form.Group controlId="service">
								<Form.Label>Service Name</Form.Label>
								<InputGroup>
									<InputGroup.Text> <GrUserWorker /> </InputGroup.Text>
									<Form.Control
										type="text"
										value={service.description}
										readOnly
										disabled
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId="category">
								<Form.Label>Category</Form.Label>
								<InputGroup>
									<InputGroup.Text> <BiCategoryAlt /> </InputGroup.Text>
									<Form.Control
										type="text"
										value={service.subcategory.category + ' (' + service.subcategory.name + ')'}
										readOnly
										disabled
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId="rating">
								<Form.Label>Rating</Form.Label>
								<InputGroup>
									<InputGroup.Text> <RiStarSFill /> </InputGroup.Text>
									<Form.Control
										type="text"
										value="8.5 / 10"
										readOnly
										disabled
									/>
								</InputGroup>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="first_name">
								<Form.Label>Name</Form.Label>
								<InputGroup>
									<InputGroup.Text> <BiUser /> </InputGroup.Text>
									<Form.Control
										type="text"
										value={service.user.first_name + ' ' + service.user.last_name + ' (' + service.user.username + ')'}
										readOnly
										disabled
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId="email">
								<Form.Label>Email</Form.Label>
								<InputGroup>
									<InputGroup.Text> <HiOutlineMail /> </InputGroup.Text>
									<Form.Control
										type="email"
										value={service.user.email}
										readOnly
										disabled
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId="phone">
								<Form.Label>Phone Number</Form.Label>
								<InputGroup>
									<InputGroup.Text> <BsTelephoneFill /> </InputGroup.Text>
									<Form.Control
										type="tel"
										value={service.user.phone}
										readOnly
										disabled
									/>
								</InputGroup>
							</Form.Group>
						</Col>
					</Row>
					<hr />
					<Row>
						<Modal.Title>Cost</Modal.Title>
						<Col>
							<Form.Group controlId="hourly_price">
								<Form.Label>Hourly Price ($)</Form.Label>
								<InputGroup>
									<InputGroup.Text> <MdOutlineAttachMoney /> </InputGroup.Text>
									<Form.Control
										type="number"
										value={service.hourly_price}
										readOnly
										disabled
									/>
								</InputGroup>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="full_day_price">
								<Form.Label>Full-day Price ($)</Form.Label>
								<InputGroup>
									<InputGroup.Text> <MdOutlineAttachMoney /> </InputGroup.Text>
									<Form.Control
										type="number"
										value={service.full_day_price}
										readOnly
										disabled
									/>
								</InputGroup>
							</Form.Group>
						</Col>
					</Row>
					<hr />
					<Row>
						<Modal.Title>Request service</Modal.Title>
						<Col>
							<Form.Group controlId="offered_budget">
								<Form.Label>Offered Budget </Form.Label>
								<InputGroup>
									<InputGroup.Text> <MdOutlineAttachMoney /> </InputGroup.Text>
									<Form.Control
										type="number"
										onChange={handleBudgetChange}
										required
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId="photo">
								<Form.Label>Upload Photos (optional)</Form.Label>
								<Form.Control
									type="file"
									accept="image/*"
									onChange={handlePhotoChange}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="start_date">
								<Form.Label>Request Start Date</Form.Label>
								<Form.Control
									type="date"
									onChange={handleStartDateChange}
									required
								/>
							</Form.Group>
							<Form.Group controlId="end_date">
								<Form.Label>Request End Date</Form.Label>
								<Form.Control
									type="date"
									onChange={handleEndDateChange}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<hr />
					<Form.Group controlId="comments">
						<Form.Label>Comments</Form.Label>
						<Form.Control
							as="textarea"
							rows={4}
							value={comments}
							onChange={handleCommentsChange}
							placeholder='Full description of the service you need'
							required
							isInvalid={!comments.trim()}
							autoFocus
						/>
						<Form.Control.Feedback type="invalid">
							Please provide comments.
						</Form.Control.Feedback>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Cancel
				</Button>
				<Button
					variant="warning"
					onClick={handleFormSubmit}
					disabled={!isFormValid} // Disable the button if the form is not valid
				>
					<FaFileContract /> Hire
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default HireModal;
