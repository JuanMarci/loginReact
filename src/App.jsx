import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SpeaklyApp from './Speakly.jsx';
import Login from './Login.jsx';
import Registro from './Registro.jsx';

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUsuarioAutenticado(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            usuarioAutenticado ? <SpeaklyApp /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={<Login setUsuarioAutenticado={setUsuarioAutenticado} />}
        />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



