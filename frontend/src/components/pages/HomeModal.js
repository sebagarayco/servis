import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function HomeModal() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="none" onClick={handleShow}>
				<h4>¿Ofreces servicios?</h4>
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Sumate a la flota Servis!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<span>¡Bienvenido/a a nuestra aplicación para profesionales!</span>
					<p>
						Nos complace mucho que hayas decidido unirte a nuestra comunidad de expertos. Nuestra aplicación está diseñada para ayudarte a conectarte con otros profesionales de tu campo y expandir tus oportunidades laborales.
					</p>
					<p>
						Como miembro de nuestra plataforma, tendrás acceso a una amplia gama de herramientas y recursos para mejorar tus habilidades, encontrar nuevos trabajos, colaborar en proyectos y conectarte con otros profesionales en tu área de especialización.
					</p>
					<p>
						Estamos seguros de que encontrarás nuestra aplicación útil y fácil de usar. No dudes en ponerte en contacto con nosotros si tienes alguna pregunta o sugerencia.
					</p>
					¡Gracias por unirte a nuestra comunidad de profesionales!
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}