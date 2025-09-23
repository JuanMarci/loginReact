import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import speaklyLogo from './assets/speakly-logo.svg';
import './Bienvenida.css';

function Bienvenida() {
  const navigate = useNavigate();

  const iniciarApp = () => {
  navigate('/login'); // ✅ Siempre lleva al login
};


  return (
    <div className="bienvenida-container">
      <img src={speaklyLogo} alt="Logo de Speakly" className="logo-bienvenida" />
      <h1 className="titulo-bienvenida">Bienvenido a Speakly</h1>
      <p className="subtitulo-bienvenida">
        Tu texto a voz, tu voz a texto, ideas con estilo.
      </p>
      <button className="boton-iniciar" onClick={iniciarApp}>
        🚀 Iniciar
      </button>
    </div>
  );
}

export default Bienvenida;

