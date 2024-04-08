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
import ProfileStatsRow from '../utils/ProfileStatsRow';

const ProfilePublic = () => {
  const { user_id } = useParams();
  const users = useSelector(state => state.userdata.users);
  const services = useSelector(state => state.services.services);
  const contracts = useSelector(state => state.contracts.contracts);
  const authUser = useSelector(state => state.auth.user);

  const user = users.find(user => user.id === parseInt(user_id));
  const userServices = services.filter(service => service.provider === parseInt(user_id));
  const userContracts = contracts.filter(contract => contract.provider.id === parseInt(user_id));

  // Check if userId is the same as logged-in user id
  if (parseInt(user_id) === authUser.id) {
    // Redirect to /profile
    return <Navigate to="/profile" replace />;
  }

  return (
    <div>
      <Nav />
      <Container>
        <Row>
          <Col className="profile-info">
            <h3><Badge pill text='dark' bg="primary">Perfil Público</Badge></h3>
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
            <ProfileStatsRow services={services} contracts={contracts} userId={user.id} />
            <hr />
            <Row>
              <h2><RiToolsFill /> Servicios Publicados </h2>
              <ProfileServiceTable services={userServices} userId={user.id} publishEnabled={false} />
            </Row>
            <Row>
              <HomeReviews userId={user.id} />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePublic;
