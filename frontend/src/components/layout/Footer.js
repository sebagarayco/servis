import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FloatingWhatsApp } from 'react-floating-whatsapp'

export class Footer extends Component {
	render() {
		return (
			<div className='footer'>
				<Container>
					<Row>
						<Col className='footer-col1'>
							<h4>Acerca de Servis</h4>
							<p>Servis es una aplicación que sirve para .......</p>
						</Col>
						<Col className='footer-col2'>
							<div>
								<i className="bi bi-geo-alt"></i> Bariloche
							</div>
							<div>
								<i className="bi bi-whatsapp"></i> +54 9 294 4128790
							</div>
							<div>
								<i className="bi bi-instagram"></i> @sebagarayco
							</div>
							<div>
								<i className="bi bi-envelope"></i> <a href="mailto:sebagarayco@gmail.com">sebagarayco@gmail.com</a>
							</div>
						</Col>
						<Col className='footer-col3'>
							<ul>
								<li><Link to="/contacto"><h4>Contacto</h4></Link></li>
								<li><Link to="/faq"><h4>Preguntas frecuentes</h4></Link></li>
								<li><Link to="/nosotros"><h4>Sobre nosotros</h4></Link></li>
							</ul>
						</Col>
					</Row>
				</Container>
				<FloatingWhatsApp
					chatboxHeight='500px'
					notification='true'
					accountName='Servis Soporte'
					chatMessage='Hola, ¿en qué te puedo ayudar?'
					statusMessage='Respondemos en menos de 1 hora.'
					phoneNumber='5492944128790'
				/>
			</div>
		)
	}
}

export default Footer