import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SpeaklyApp from './Speakly.jsx';
import Login from './Login.jsx';
import Registro from './Registro.jsx'; // 👈 importa el nuevo componente

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  useEffect(() => {
    // Aquí podrías verificar si el usuario ya está autenticado
    const token = localStorage.getItem('token');
    setUsuarioAutenticado(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          usuarioAutenticado ? <SpeaklyApp /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


