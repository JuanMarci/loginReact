import { useState } from 'react';
import './App.css';

function Conversor() {
  const [textoAvoz, setTextoAvoz] = useState("");
  const [vozAtexto, setVozAtexto] = useState("");
  const [grabando, setGrabando] = useState(false);
  const [vistaDocumento, setVistaDocumento] = useState(false);

  function cambiarTextoAvoz(evento) {
    setTextoAvoz(evento.target.value);
  }

  function convertirTextoAvoz() {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textoAvoz);
    synth.speak(utterance);
  }

  function grabarVozAtexto() {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;

    recognition.onresult = function (event) {
      const texto = Array.from(event.results)
        .map(resultado => resultado[0].transcript)
        .join(' ');
      setVozAtexto(prev => prev + ' ' + texto);
    };

    recognition.onend = () => setGrabando(false);
    recognition.start();
    setGrabando(true);
  }

  function copiarAlPortapapeles() {
    navigator.clipboard.writeText(vozAtexto);
  }

  return (
    <div className="contenedor-conversor">
      <h1>Conversor TTS y STT</h1>

      <section>
        <h3>Conversor de texto a voz</h3>
        <input
          type="text"
          id="textoAvoz"
          value={textoAvoz}
          onChange={cambiarTextoAvoz}
        />
        <button onClick={convertirTextoAvoz}>Convertir</button>
      </section>

      <section>
        <h3>Dictado de voz a texto</h3>
        <button onClick={grabarVozAtexto} disabled={grabando}>
          {grabando ? 'Grabando...' : 'Iniciar dictado'}
        </button>
        <button onClick={copiarAlPortapapeles}>Copiar al portapapeles</button>
        <button onClick={() => setVistaDocumento(prev => !prev)}>
          {vistaDocumento ? 'Modo edición' : 'Vista tipo documento'}
        </button>

        {vistaDocumento ? (
          <div className="vista-documento">
            <h2>Documento transcrito</h2>
            <p>{vozAtexto}</p>
          </div>
        ) : (
          <textarea
            value={vozAtexto}
            onChange={e => setVozAtexto(e.target.value)}
            placeholder="Tu texto dictado aparecerá aquí..."
            rows={15}
          />
        )}
      </section>
    </div>
  );
}

export default Conversor;
