import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
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
            {user && (
              <Card>
                <Card.Header>
                  <h2><Badge pill bg="danger">Perfil Público</Badge></h2>
                </Card.Header>
                <Card.Img variant="top" src={user.image} alt="Profile" />
                <Card.Body>
                  <Card.Title>👤 Información</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Nombre:</strong> {user.first_name} {user.last_name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Rol:</strong> {user.role}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Email:</strong> {user.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Teléfono:</strong> {user.phone || 'N/A'}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Body>
                  <Card.Title>📍 Ubicación</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Dirección:</strong> <Link to='/hire'>Contratar para ver</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Ciudad:</strong> <Link to='/hire'>Contratar para ver</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Estado:</strong> <Link to='/hire'>Contratar para ver</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>C.P:</strong> <Link to='/hire'>Contratar para ver</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>País:</strong> <Link to='/hire'>Contratar para ver</Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
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
