import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Conversor from './Conversor.jsx'

function App() {
  const [usuario, setUsuario] = useState("")
  const [clave, setClave] = useState("")
  const [logueado, setlogueado] = useState(false)

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) {
    setClave(evento.target.value)
  }

  async function ingresar() {
  try {
    const peticion = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        usuario: usuario,
        clave: clave
      })
    });

    if (peticion.ok) {
      const respuesta = await peticion.json();
      console.log("Sesión iniciada para:", respuesta.usuario);
      setlogueado(true);
    } else {
      const error = await peticion.json();
      alert(error.mensaje || "Usuario o clave incorrectos");
    }
  } catch (err) {
    console.error("Error en login:", err);
    alert("Hubo un problema con el servidor.");
  }
}

  async function validar() {
    const peticion = await fetch("http://localhost:3000/validar", { credentials: 'include' })
    if (peticion.ok) {
      setlogueado(true)
    }
  }
  useEffect(() =>{
    validar()
  }, [])  

  if (logueado) {
    return <Conversor/>  
  }

  return (
    <>
    <h1>Inicio de Sesión</h1>
      <input type="text" name="usuario" value={usuario} onChange={cambiarUsuario} placeholder="Usuario" />
      <input type="password" name="clave" value={clave} onChange={cambiarClave} placeholder="Clave" />
      <button onClick={ingresar}>Ingresar</button>   
    </>
  )
}

export default App
