import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
// Icons
import { RiToolsFill } from 'react-icons/ri';
// Components
import Nav from '../layout/Nav';
import ProfileServiceTable from './ProfileServiceTable';
import HomeReviews from './HomeReviews';

const ProfilePublic = () => {
  const { user_id } = useParams();
  const users = useSelector(state => state.userdata.users);
  const contracts = useSelector(state => state.contracts.contracts);
  const authUser = useSelector(state => state.auth.user);

  const user = users.find(user => user.id === parseInt(user_id));
  const userContracts = contracts.filter(contract => contract.service.provider === parseInt(user_id));

  const totalServices = userContracts.length;

  let totalReviews = 0;
  userContracts.forEach(contract => {
    totalReviews += contract.contract_reviews ? contract.contract_reviews.length : 0;
  });

  const rating = 4.5; // Placeholder

  // Check if userId is the same as logged-in user id
  if (parseInt(user_id) === authUser.id) {
    // Redirect to /profile
    return <Navigate to="/profile" replace />;
  }

  return (
    <div>
      <Nav />
      <Container>
        <h1>User Profile</h1>
        <Row>
          <Col className="profile-info">
            {user && (
              <div key={user.id}>
                <div className="profile-image">
                  <img src={user.image} alt="Profile" />
                </div>
                <hr style={{ width: '90%' }} />
                <h2>{user.first_name} {user.last_name}</h2>
                <h3>{user.username}</h3>
                <h3>{user.email}</h3>
              </div>
            )}
          </Col>
          <Col xs={12} md={6} lg={9} className="profile-services">
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
            <Row>
              <h2><RiToolsFill /> Servicios Publicados </h2>
              <ProfileServiceTable services={userContracts} userId={user.id} publishEnabled={false} />
            </Row>
            <Row>
              <HomeReviews userId={user_id} />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePublic;
