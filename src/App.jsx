import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 💡 IMPORTANTE para redirecciones
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Conversor from './Conversor.jsx';

function App() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate(); // ⚡ Necesario para redireccionar

  // 🔑 Manejadores de inputs
  function cambiarUsuario(evento) {
    setUsuario(evento.target.value);
  }

  function cambiarClave(evento) {
    setClave(evento.target.value);
  }

  // 🔐 Login manual
  async function ingresar() {
    const peticion = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ usuario, clave })
    });

    if (peticion.ok) {
      setMensaje("✅ Inicio de sesión exitoso. ¡Bienvenido!");
      setLogueado(true);
      navigate("/conversor"); // 👉 Redirige automáticamente si inicia sesión
    } else {
      alert("Usuario o clave incorrectos");
    }
  }

  // 🔎 Validación automática de sesión al cargar
  useEffect(() => {
    async function validarSesion() {
      const res = await fetch("http://localhost:3000/validar", { credentials: "include" });
      if (res.ok) {
        setLogueado(true);
      } else {
        setLogueado(false);
      }
    }
    validarSesion();
  }, []);

  // 🚀 Redirección si ya está logueado
  useEffect(() => {
    if (logueado) {
      navigate("/conversor");
    }
  }, [logueado]);

  return (
    <>
      {mensaje && (
        <div className="banner">
          {mensaje}
        </div>
      )}

      <h1>Inicio de Sesión</h1>
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
    </>
  );
}

export default App;

