import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SpeaklyApp from './Speakly.jsx';
import Login from './Login.jsx';
import Registro from './Registro.jsx';
import Bienvenida from './Bienvenida.jsx';

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUsuarioAutenticado(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Página de bienvenida con redirección si ya está autenticado */}
        <Route
          path="/"
          element={
            <Bienvenida />}     
        />

        {/* ✅ Ruta protegida para la app */}
        <Route
          path="/app"
          element={
            usuarioAutenticado ? <SpeaklyApp /> : <Navigate to="/login" />
          }
        />

        {/* ✅ Login y registro */}
        <Route
          path="/login"
          element={<Login setUsuarioAutenticado={setUsuarioAutenticado} />}
        />
        <Route path="/registro" element={<Registro />} />

        {/* ✅ Redirección para rutas no válidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





