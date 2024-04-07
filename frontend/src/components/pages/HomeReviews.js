import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const HomeReviews = ({ userId }) => {
	const contracts = useSelector(state => state.contracts.contracts);

	const filteredContracts = userId ? contracts.filter(contract => contract.provider.id === userId) : contracts;

	const getStarRating = (rating) => {
		const stars = '⭐️';
		return stars.repeat(rating);
	};

	return (
		<Container className='home-subcontainer'>
			<h1>Reseñas recientes</h1>
			<hr />
			<Row className='g-7'>
				{filteredContracts.length > 0 ? (
					filteredContracts.map((contract) =>
						contract.contract_reviews.map((review, index) => (
							<Col sm={4} key={`${contract.id}-${index}`}>
								<Card className='home-review-card'>
									<Card.Body>
										<Card.Title>"{review.review} ..."</Card.Title>
										<Card.Subtitle className='mb-3 mt-2'>
											{contract.service.subcategory.name}
										</Card.Subtitle>
										<Card.Subtitle className='mb-2 mt-2 text-muted'>
											<Link className='contract-table-link' to={`/profile/${contract.provider.id}`}>
												{contract.provider.first_name} {contract.provider.last_name}
											</Link>
											<p>recibió {getStarRating(review.rating)} el {new Date(review.created).toLocaleString('es-ES')}</p>
										</Card.Subtitle>
									</Card.Body>
								</Card>
							</Col>
						))
					)
				) : (
					<p>No ha recibido reseñas ... 😢</p>
				)}
			</Row>
		</Container>
	);
}

export default HomeReviews;
