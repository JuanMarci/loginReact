import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // 🎨 estilos
import reactLogo from './assets/react.svg'; // 🔵 si no los usas, puedes quitar
import viteLogo from '/vite.svg';

function App() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const cambiarUsuario = (e) => setUsuario(e.target.value);
  const cambiarClave = (e) => setClave(e.target.value);

  // 🔐 Login manual
  async function ingresar() {
    try {
      const respuesta = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ usuario, clave })
      });

      if (!respuesta.ok) {
        return alert("Usuario o clave incorrectos");
      }

      setMensaje("✅ Inicio de sesión exitoso. ¡Bienvenido!");
      setLogueado(true);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error de conexión con el servidor");
    }
  }

  // 🔎 Validar sesión al montar
  useEffect(() => {
    async function validarSesion() {
      try {
        const res = await fetch("http://localhost:3000/validar", {
          credentials: "include"
        });
        setLogueado(res.ok);
      } catch (error) {
        console.error("Error al validar sesión:", error);
      }
    }
    validarSesion();
  }, []);

  // 🚀 Redirigir si ya está logueado
  useEffect(() => {
    if (logueado) {
      navigate("/conversor");
    }
  }, [logueado, navigate]);

  return (
    <div className="App">
      {mensaje && <div className="banner">{mensaje}</div>}

      <h1>Inicio de Sesión</h1>
      <input
        type="text"
        name="usuario"
        value={usuario}
        onChange={cambiarUsuario}
        placeholder="Usuario"
        autoFocus
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
  );
}

export default App;

