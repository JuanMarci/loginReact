import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Conversor from './Conversor.jsx';
import Login from './Login.jsx';

function App() {
  const [logueado, setlogueado] = useState(false);

  useEffect(() => {
    validar();
  }, []);

  async function validar() {
    const peticion = await fetch('http://localhost:3000/validar', {
      credentials: 'include',
    });
    if (peticion.ok) {
      setlogueado(true);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setlogueado={setlogueado} />} />
        <Route
          path="/conversor"
          element={logueado ? <Conversor /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

