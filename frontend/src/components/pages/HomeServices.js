import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// Bootstrap
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

export class HomeServices extends Component {
	render() {
		const images = [
			{ name: 'Bienestar', url: 'static/icons8-ambulance-64.png' },
			{ name: 'Cuidadores', url: 'static/icons8-baby-shoes-64.png' },
			{ name: 'Técnico', url: 'static/icons8-bag-64.png' },
			{ name: 'Eventos', url: 'static/icons8-balloons-64.png' },
			{ name: 'Limpieza', url: 'static/icons8-bucket-64.png' },
			{ name: 'Autos', url: 'static/icons8-car-64.png' },
			{ name: 'Limpieza', url: 'static/icons8-clean-64.png' },
			{ name: 'Colocador', url: 'static/icons8-drill-64.png' },
			{ name: 'Cocina', url: 'static/icons8-food-64.png' },
			{ name: 'Autos', url: 'static/icons8-mechanic-64.png' },
			{ name: 'Jardinería', url: 'static/icons8-plant-64.png' },
			{ name: 'Seguridad', url: 'static/icons8-police-64.png' },
			{ name: 'Plomería', url: 'static/icons8-washing-hands-64.png' },
			{ name: 'Electricista', url: 'static/icons8-worker-64.png' },
		];

		// Split the images array into chunks of 7 for each row
		const rows = [];
		for (let i = 0; i < images.length; i += 7) {
			rows.push(images.slice(i, i + 7));
		}

		return (
			<Container className='homeservices-subcontainer'>
				<h1>Categorías</h1>
				<hr />
				{rows.map((row, rowIndex) => (
					<Row key={rowIndex} className='g-4'>
						{row.map((image, colIndex) => (
							<Col key={colIndex} sm>
								<Link className='homeservices-link' to='/services'>
									<div className='homeservices-image-container'>
										<Image src={image.url} height={64} width={64} rounded />
										<Card.Title>{image.name}</Card.Title>
									</div>
								</Link>
							</Col>
						))}
					</Row>
				))}
			</Container>
		)
	}
}

export default HomeServices;