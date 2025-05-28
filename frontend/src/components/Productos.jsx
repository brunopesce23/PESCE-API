import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import "../App.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProducto, setCurrentProducto] = useState({ nombre: '', precio: '' });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const res = await axios.get('http://localhost:3001/productos');
    setProductos(res.data);
  };

  const handleSave = async () => {
    if (currentProducto.id) {
      await axios.put(`http://localhost:3001/productos/${currentProducto.id}`, currentProducto);
    } else {
      await axios.post('http://localhost:3001/productos', currentProducto);
    }
    fetchProductos();
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/productos/${id}`);
    fetchProductos();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Lista de Productos', 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [['Nombre', 'Precio']],
      body: productos.map(producto => [
        producto.nombre,
        `$${producto.precio}`
      ])
    });
  
    doc.save('productos.pdf');
  };

  return (
    <div className="mt-4 productos-container">
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
            onClick={() => { setCurrentProducto({}); setShowModal(true); }} 
            className="me-2"
          >
            Agregar Producto
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
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>${prod.precio}</td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  onClick={() => { setCurrentProducto(prod); setShowModal(true); }} 
                  className="me-2"
                >
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDelete(prod.id)}
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
          <Modal.Title>{currentProducto.id ? 'Editar' : 'Agregar'} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={currentProducto.nombre || ''}
                onChange={(e) => setCurrentProducto({...currentProducto, nombre: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={currentProducto.precio || ''}
                onChange={(e) => setCurrentProducto({...currentProducto, precio: e.target.value})}
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

export default Productos;