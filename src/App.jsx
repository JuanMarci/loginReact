import { useEffect, useState } from 'react';
import './App.css';
import Conversor from './Conversor.jsx';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [logueado, setlogueado] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    validar();
  }, []);

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value);
  }

  function cambiarClave(evento) {
    setClave(evento.target.value);
  }

  async function ingresar() {
    const peticion = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ usuario, clave }),
    });

    if (peticion.ok) {
      setMensaje('✅ Inicio de sesión exitoso. ¡Bienvenido!');
      setlogueado(true);
    } else {
      alert('Usuario o clave incorrectos');
    }
  }

  async function validar() {
    const peticion = await fetch('http://localhost:3000/validar', {
      credentials: 'include',
    });
    if (peticion.ok) {
      setlogueado(true);
    }
  }

  if (logueado) {
    return <Conversor />;
  }

  return (
    <div className="container">
      <div className="formulario">
        {mensaje && <div className="banner">{mensaje}</div>}
        <h2>Inicio de Sesión</h2>
        <input
          type="text"
          name="usuario"
          value={usuario}
          onChange={cambiarUsuario}
          placeholder="Usuario"
        />
        <input
          type="password"
          name="clave"
          value={clave}
          onChange={cambiarClave}
          placeholder="Clave"
        />
        <button onClick={ingresar}>Ingresar</button>
      </div>
    </div>
  );
}

export default App;

