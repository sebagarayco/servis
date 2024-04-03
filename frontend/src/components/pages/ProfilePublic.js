import React from 'react';
import { useParams } from 'react-router-dom';
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

const ProfilePublic = () => {
  const { user_id } = useParams();
  const users = useSelector(state => state.userdata.users);
  const services = useSelector(state => state.services.services);

  const user = users.find(user => user.id === parseInt(user_id));
  const userServices = services.filter(service => service.provider === parseInt(user_id));

  // Placeholder data for user metrics
  const totalServices = userServices.length; // Replace with actual data
  const totalReviews = 25; // Placeholder
  const rating = 4.5; // Placeholder

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
                <p className="user-number-label">Total Reviews 💬</p>
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
              <ProfileServiceTable services={userServices} userId={user.id} publishEnabled={false} />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePublic;
