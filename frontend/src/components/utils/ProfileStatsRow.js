import React from 'react';
// Boostrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

const ProfileStatsRow = ({ services, contracts, userId }) => {
	const totalServices = services.filter(service => service.provider === userId).length;
	const totalReviews = contracts.filter(contract => contract.provider.id === userId).reduce((acc, contract) => {
		return acc + (contract.contract_reviews ? contract.contract_reviews.length : 0);
	}, 0);
	// TODO: Calculate rating based on reviews
	const rating = (Math.random() * (5 - 3) + 3).toFixed(1);

	return (
		<div>
			<Row className="profile-services-row">
				<Col xs={3} className="user-number">
					<h1>
						<Badge pill bg="secondary">{totalServices}</Badge>
					</h1>
					<p className="user-number-label">Total Servicios ⚙ ️</p>
				</Col>
				<Col xs={3} className="user-number">
					<h1>
						<Badge pill bg="secondary">{totalReviews}</Badge>
					</h1>
					<p className="user-number-label">Total Reseñas 💬</p>
				</Col>
				<Col xs={3} className="user-number">
					<h1>
						<Badge pill bg="secondary">{rating}</Badge>
					</h1>
					<p className="user-number-label">Rating ⭐️</p>
				</Col>
			</Row>
			<hr />
		</div >
	);
};

export default ProfileStatsRow;
