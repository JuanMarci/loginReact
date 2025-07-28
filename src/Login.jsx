import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login({ setlogueado }) {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  function cambiarUsuario(e) {
    setUsuario(e.target.value);
  }

  function cambiarClave(e) {
    setClave(e.target.value);
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
      navigate('/conversor');
    } else {
      alert('Usuario o clave incorrectos');
    }
  }

  return (
    <div className="container">
      <div className="formulario">
        {mensaje && <div className="banner">{mensaje}</div>}
        <h2>Inicio de Sesión</h2>
        <div className="inputContainer">
          <FaUser className="icon" />
          <input type="text" value={usuario} onChange={cambiarUsuario} placeholder="Usuario" />
        </div>
        <div className="inputContainer">
          <FaLock className="icon" />
          <input type="password" value={clave} onChange={cambiarClave} placeholder="Clave" />
        </div>
        <button onClick={ingresar}>Ingresar</button>
      </div>
    </div>
  );
}

export default Login;