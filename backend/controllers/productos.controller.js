const fs = require('fs');
const path = './data/productos.json';

const getProductos = (req, res) => {
  const productos = JSON.parse(fs.readFileSync(path));
  res.json(productos);
};

const createProducto = (req, res) => {
  const productos = JSON.parse(fs.readFileSync(path));
  const nuevoProducto = { id: Date.now(), ...req.body };
  productos.push(nuevoProducto);
  fs.writeFileSync(path, JSON.stringify(productos, null, 2));
  res.json(nuevoProducto);
};

const updateProducto = (req, res) => {
  const productos = JSON.parse(fs.readFileSync(path));
  const index = productos.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body };
    fs.writeFileSync(path, JSON.stringify(productos, null, 2));
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
};

const deleteProducto = (req, res) => {
  const productos = JSON.parse(fs.readFileSync(path));
  const productosFiltrados = productos.filter(p => p.id != req.params.id);
  fs.writeFileSync(path, JSON.stringify(productosFiltrados, null, 2));
  res.json({ success: true });
};

module.exports = { getProductos, createProducto, updateProducto, deleteProducto };