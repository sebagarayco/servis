import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export class HomeCards extends Component {


	render() {
		return (
			<div>
				<Container className='home-subcontainer'>
					<Row className='g-7'>
						<h1>Ideas para el hogar</h1>
						<Col sm>
							<Card >
								<Card.Img variant="top" src="https://picsum.photos/200/100" />
								<Card.Body>
									<Card.Title>Card Title</Card.Title>
									<Card.Text>
										Some quick example text to build on the card title and make up the
										bulk of the card's content.
									</Card.Text>
									<Button variant="primary">Go somewhere</Button>
								</Card.Body>
							</Card>
						</Col>
						<Col sm>
							<Card >
								<Card.Img variant="top" src="https://picsum.photos/200/101" />
								<Card.Body>
									<Card.Title>Card Title</Card.Title>
									<Card.Text>
										Some quick example text to build on the card title and make up the
										bulk of the card's content.
									</Card.Text>
									<Button variant="primary">Go somewhere</Button>
								</Card.Body>
							</Card>
						</Col>
						<Col sm>
							<Card >
								<Card.Img variant="top" src="https://picsum.photos/200/102" />
								<Card.Body>
									<Card.Title>Card Title</Card.Title>
									<Card.Text>
										Some quick example text to build on the card title and make up the
										bulk of the card's content.
									</Card.Text>
									<Button variant="primary">Go somewhere</Button>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

export default HomeCards;