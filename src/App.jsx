import { useState } from 'react'
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

  function ingresar() {
    if (usuario === "admin" && clave === "admin") {
      console.log("Usuario y clave correctos")
      alert("Bienvenido")
      setlogueado(true)
    } else {
      alert("Usuario o clave incorrectos")
    }
  }

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
