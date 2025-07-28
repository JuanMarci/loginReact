import { useState } from 'react';
import './App.css';

function Registro() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');

  async function registrar() {
    const peticion = await fetch('http://localhost:3000/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, clave }),
    });

    if (peticion.ok) {
      setMensaje('✅ Usuario registrado correctamente.');
    } else {
      setMensaje('❌ Error al registrar. Revisa los datos.');
    }
  }

  return (
    <div className="container">
      <div className="formulario">
        <h2>Registro</h2>
        <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Usuario" />
        <input type="password" value={clave} onChange={e => setClave(e.target.value)} placeholder="Clave" />
        <button onClick={registrar}>Registrarse</button>
        {mensaje && <div className="banner">{mensaje}</div>}
      </div>
    </div>
  );
}

export default Registro;