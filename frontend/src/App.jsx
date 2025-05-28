import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Productos from './components/Productos';
import Usuarios from './components/Usuarios';
import Home from './components/Home';

function App() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Sistema de Gestión</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </div>
  );
}

export default App;