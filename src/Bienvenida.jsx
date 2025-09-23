import React from 'react';
import speaklyLogo from './assets/speakly-logo.svg'; // Asegúrate de que la ruta sea correcta
import './Bienvenida.css'; // Puedes crear estilos personalizados aquí
import { useNavigate } from 'react-router-dom';

function Bienvenida() {
  const navigate = useNavigate();

  const iniciarApp = () => {
    navigate('/app'); // Ajusta la ruta según tu estructura
  };

  return (
    <div className="bienvenida-container">
      <img src={speaklyLogo} alt="Logo de Speakly" className="logo-bienvenida" />
      <h1>Bienvenido a Speakly</h1>
      <p>Convierte tu voz en texto, tu texto en voz, y exporta tus ideas con estilo.</p>
      <button className="boton-iniciar" onClick={iniciarApp}>
        🚀 Iniciar
      </button>
    </div>
  );
}

export default Bienvenida;
