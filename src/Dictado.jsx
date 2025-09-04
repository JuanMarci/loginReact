import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Dictado.css'; // Estilos separados

const Dictado = () => {
  const { listening, transcript } = useSpeechRecognition();

  return (
    <div className={`dictado-container ${listening ? 'activo' : ''}`}>
      <div className="mic-icon">
        <span className={`mic ${listening ? 'animado' : ''}`}>🎤</span>
      </div>
      <button onClick={SpeechRecognition.startListening}>Iniciar dictado</button>
      <button onClick={SpeechRecognition.stopListening}>Detener dictado</button>
      <p className="transcript">{transcript || 'Tu dictado aparecerá aquí...'}</p>
    </div>
  );
};

export default Dictado;
