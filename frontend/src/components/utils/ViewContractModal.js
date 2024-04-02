import React, { useState, useEffect, useRef } from 'react';
// Bootstrap
import { Modal, Button, Form, ListGroup, Tabs, Tab } from 'react-bootstrap';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { addContractComment } from '../../redux/actions/contracts';
import { FaTelegramPlane } from "react-icons/fa";

const ViewContractModal = ({ contract, comments, show, handleClose }) => {
	const auth = useSelector(state => state.auth);
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const chatContainerRef = useRef(null);
	const [renderTrigger, setRenderTrigger] = useState(true); // Add this line

	const handleSave = () => {
		if (newComment.trim() !== '') {
			const commentData = {
				amount: contract.amount,
				service: contract.service.id,
				contract: contract.id,
				contract_comments: [{
					comment: newComment,
					user: auth.user.id
				}],
			};
			dispatch(addContractComment(contract.id, commentData));
			setNewComment('');
		}
	};

	// Use useEffect to track comments changes and set the render trigger
	useEffect(() => {
		setRenderTrigger(prev => !prev);
	}, [comments]);

	// Adjust this useEffect to scroll based on the renderTrigger
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [renderTrigger]); // Now it reacts to renderTrigger changes

	const handleCommentChange = (e) => {
		setNewComment(e.target.value);
	};

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		handleSave();
	};

	const handleTabSelect = (key) => {
		if (key === "messages" && chatContainerRef.current) {
			// Wait for the tab content to be shown before scrolling
			setTimeout(() => {
				chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
			}, 100); // Adjust timeout as necessary
		}
	};

	return (
		<Modal show={show} onHide={handleClose} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>Detalles del contrato - ID: #{contract.id}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Tabs defaultActiveKey="details" id="contract-tabs" className="lg-3" onSelect={handleTabSelect}>
					<Tab eventKey="details" title="Detalles">
						<Form >
					<Form.Group>
						<Form.Label>Estado:</Form.Label>
						<Form.Control
							type="text"
							disabled
							defaultValue={contract.status}
						/>
						<Form.Text muted>
							On-hold: Pending approval from the service provider<br />
							In-progress: The provider agrees to perform the work<br />
							Completed: The provider has finished the work<br />
						</Form.Text>
					</Form.Group>
					<br />
					<Form.Group>
						<Form.Label>Descripción:</Form.Label>
						<Form.Control
							type="text"
							disabled
							defaultValue={contract.description}
						/>
					</Form.Group>
					<br />
					<Form.Group>
						<Form.Label>Precio acordado:</Form.Label>
						<Form.Control
							type="text"
							disabled
							defaultValue={`$ ${contract.amount}`}
						/>
					</Form.Group>
						</Form>
					</Tab>
					<Tab eventKey="messages" title="Mensajes">
					<h2>Mensajes</h2>
						<Form onSubmit={handleCommentSubmit}>
					<ListGroup className="chat-container" ref={chatContainerRef}>
						{comments && comments.length > 0 ? (
							comments.map((comment, index) => (
								<ListGroup.Item
									key={index}
									className={`chat-message ${comment.user.id === auth.user.id ? 'chat-message-sender' : 'chat-message-receiver'}`}
								>
									<img src={comment.user.image} alt={comment.user.username} />
									<div>
										<span>{comment.comment}</span>
										<span className="chat-timestamp">
											<strong>{comment.user.id === auth.user.id ? 'Yo' : comment.user.username}</strong> el {new Date(comment.created).toLocaleString(('es-ES'))}hs.
										</span>
									</div>
								</ListGroup.Item>
							))
						) : (
										<p>Sin comentarios aún ... haz el primero!</p>
						)}
					</ListGroup>

					<Form.Group className="chat-input-container">
						<Form.Control
							type="text"
							placeholder="Escribir comentario ..."
							value={newComment}
							onChange={handleCommentChange}
							className="chat-input"
						/>
								<Button type="submit" size='lg' variant="warning" className="chat-send-btn" >
							Enviar <FaTelegramPlane />
						</Button>
					</Form.Group>
						</Form>
					</Tab>
				</Tabs>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ViewContractModal;
