import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import "../App.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUsuario, setCurrentUsuario] = useState({ nombre: '', email: '', edad: '' });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const res = await axios.get('http://localhost:3001/usuarios');
    setUsuarios(res.data);
  };

  const handleSave = async () => {
    if (currentUsuario.id) {
      await axios.put(`http://localhost:3001/usuarios/${currentUsuario.id}`, currentUsuario);
    } else {
      await axios.post('http://localhost:3001/usuarios', currentUsuario);
    }
    fetchUsuarios();
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/usuarios/${id}`);
    fetchUsuarios();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Lista de Usuarios', 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [['Nombre', 'Email', 'Edad']],
      body: usuarios.map(user => [
        user.nombre,
        user.email,
        `${user.edad} años`
      ]),
    });
    doc.save('usuarios.pdf');
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button 
          variant="outline-secondary" 
          onClick={() => window.location.href = "/"}
        >
          ← Inicio
        </Button>
        
        <div>
          <Button 
            variant="primary" 
            onClick={() => { setCurrentUsuario({}); setShowModal(true); }} 
            className="me-2"
          >
            Agregar Usuario
          </Button>
          <Button 
            variant="success" 
            onClick={exportToPDF}
          >
            Exportar PDF
          </Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.edad}</td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  onClick={() => { setCurrentUsuario(user); setShowModal(true); }} 
                  className="me-2"
                >
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUsuario.id ? 'Editar' : 'Agregar'} Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={currentUsuario.nombre || ''}
                onChange={(e) => setCurrentUsuario({...currentUsuario, nombre: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentUsuario.email || ''}
                onChange={(e) => setCurrentUsuario({...currentUsuario, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                value={currentUsuario.edad || ''}
                onChange={(e) => setCurrentUsuario({...currentUsuario, edad: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Usuarios;