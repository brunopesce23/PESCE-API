const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Productos y Usuarios');
});

app.listen(3001, () => {
  console.log('Backend corriendo en http://localhost:3001');
});
