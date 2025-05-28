const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usuariosPath = path.join(__dirname, '../data/usuarios.json');

function leerUsuarios() {
  if (!fs.existsSync(usuariosPath)) return [];
  const data = fs.readFileSync(usuariosPath, 'utf8');
  return JSON.parse(data || '[]');
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
}

router.get('/', (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
});

router.post('/', (req, res) => {
  const usuarios = leerUsuarios();
  const nuevoUsuario = { id: Date.now(), ...req.body };
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  res.status(201).json(nuevoUsuario);
});

router.put('/:id', (req, res) => {
  const usuarios = leerUsuarios();
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  if (index !== -1) {
    usuarios[index] = { id, ...req.body };
    guardarUsuarios(usuarios);
    res.json(usuarios[index]);
  } else {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
});

router.delete('/:id', (req, res) => {
  const usuarios = leerUsuarios();
  const id = parseInt(req.params.id);
  const nuevos = usuarios.filter(u => u.id !== id);
  guardarUsuarios(nuevos);
  res.status(204).end();
});

module.exports = router;
