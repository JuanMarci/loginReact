import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login({ setUsuarioAutenticado }) {
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
    try {
      const peticion = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ usuario, clave }),
      });

      if (peticion.ok) {
        const respuesta = await peticion.json();
        localStorage.setItem('token', respuesta.token || 'token-falso'); // ✅ guarda el token
        setUsuarioAutenticado(true); // ✅ actualiza el estado global
        setMensaje('✅ Inicio de sesión exitoso. ¡Bienvenido!');
        navigate('/'); // ✅ redirige al conversor
      } else {
        setMensaje('❌ Usuario o clave incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('❌ Error de conexión con el servidor');
    }
  }

  return (
    <div className="container">
      <div className="formulario">
        {mensaje && <div className="banner">{mensaje}</div>}
        <h2>Inicio de Sesión Speakly</h2>
        <div className="inputContainer">
          <FaUser className="icon" />
          <input
            type="text"
            value={usuario}
            onChange={cambiarUsuario}
            placeholder="Usuario"
          />
        </div>
        <div className="inputContainer">
          <FaLock className="icon" />
          <input
            type="password"
            value={clave}
            onChange={cambiarClave}
            placeholder="Clave"
          />
        </div>
        <button onClick={ingresar}>Ingresar</button>

        <button onClick={() => navigate('/registro')} className="registroBtn">
          ¿No tienes cuenta? Regístrate
        </button>
      </div>
    </div>
  );
}

export default Login;
