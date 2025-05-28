const fs = require('fs');
const path = './data/usuarios.json';

const getUsuarios = (req, res) => {
  const usuarios = JSON.parse(fs.readFileSync(path));
  res.json(usuarios);
};

const createUsuario = (req, res) => {
  const usuarios = JSON.parse(fs.readFileSync(path));
  const nuevoUsuario = { id: Date.now(), ...req.body };
  usuarios.push(nuevoUsuario);
  fs.writeFileSync(path, JSON.stringify(usuarios, null, 2));
  res.json(nuevoUsuario);
};

const updateUsuario = (req, res) => {
  const usuarios = JSON.parse(fs.readFileSync(path));
  const index = usuarios.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...req.body };
    fs.writeFileSync(path, JSON.stringify(usuarios, null, 2));
    res.json(usuarios[index]);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
};

const deleteUsuario = (req, res) => {
  const usuarios = JSON.parse(fs.readFileSync(path));
  const usuariosFiltrados = usuarios.filter(u => u.id != req.params.id);
  fs.writeFileSync(path, JSON.stringify(usuariosFiltrados, null, 2));
  res.json({ success: true });
};

module.exports = { getUsuarios, createUsuario, updateUsuario, deleteUsuario };