import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaBoxOpen, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="home-container">
      <h1 className="text-center mb-5" style={{ color: 'var(--text-white)', fontSize: '2.5rem' }}>
        Panel de Administración
      </h1>
      
      <Row className="justify-content-center g-4">
        <Col xl={4} md={6} className="d-flex">
          <Card className="home-card">
            <FaBoxOpen className="home-icon" />
            <h2 className="card-title">Productos</h2>
            <p className="card-text">
              Administra el inventario de productos y precios.
            </p>
            <Button 
              variant="primary"
              onClick={() => navigate('/productos')}
              className="mt-auto"
            >
              Gestionar Productos
            </Button>
          </Card>
        </Col>

        <Col xl={4} md={6} className="d-flex">
          <Card className="home-card">
            <FaUsers className="home-icon" />
            <h2 className="card-title">Usuarios</h2>
            <p className="card-text">
              Administra los usuarios y credenciales.
            </p>
            <Button 
              variant="primary"
              onClick={() => navigate('/usuarios')}
              className="mt-auto"
            >
              Gestionar Usuarios
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;