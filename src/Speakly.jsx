import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import speaklyLogo from './assets/speakly-logo.svg';
import { generatePDF } from './utils/generatePDF';
import { generateWord } from './utils/generateWord';

function SpeaklyApp() {
  const [textoAvoz, setTextoAvoz] = useState("");
  const [vozAtexto, setVozAtexto] = useState("");
  const [grabando, setGrabando] = useState(false);
  const [vistaDocumento, setVistaDocumento] = useState(false);

  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  function cambiarTextoAvoz(evento) {
    setTextoAvoz(evento.target.value);
  }

  function convertirTextoAvoz() {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textoAvoz);
    synth.speak(utterance);
  }

  function grabarVozAtexto() {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      return;
    }

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

    recognitionRef.current = recognition;
    recognition.start();
    setGrabando(true);
  }

  function detenerGrabacion() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setGrabando(false);
    }
  }

  function copiarAlPortapapeles() {
    navigator.clipboard.writeText(vozAtexto);
  }

  function cerrarSesion() {
  alert("Gracias por usar Speakly 👋");
  localStorage.removeItem('token');
  navigate('/');
  window.location.reload();
}

  return (
    <div className="contenedor-speakly">
      <header className="encabezado-speakly">
        <img
          src={speaklyLogo}
          alt="Logo de Speakly"
          className="logo-speakly"
        />
      </header>

      <section>
        <h3>Texto a voz con Speakly</h3>
        <input
          type="text"
          id="textoAvoz"
          value={textoAvoz}
          onChange={cambiarTextoAvoz}
        />
        <button onClick={convertirTextoAvoz}>Convertir</button>
      </section>

      <section>
        <h3>Voz a texto con Speakly</h3>
        <button onClick={grabarVozAtexto} disabled={grabando}>
          {grabando ? 'Grabando...' : 'Iniciar dictado'}
        </button>

        {grabando && (
          <button onClick={detenerGrabacion}>
            Detener dictado
          </button>
        )}

        <button onClick={copiarAlPortapapeles}>Copiar al portapapeles</button>
        <button onClick={() => setVistaDocumento(prev => !prev)}>
          {vistaDocumento ? 'Modo edición' : 'Vista tipo documento'}
        </button>

        {vistaDocumento ? (
          <div className="vista-documento">
            <h2>Documento transcrito</h2>
            <p>{vozAtexto}</p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button onClick={() => generatePDF(vozAtexto)}>📄 Exportar PDF</button>
              <button onClick={() => generateWord(vozAtexto)}>📝 Exportar Word</button>
            </div>
          </div>
        ) : (
          <>
            <textarea
              value={vozAtexto}
              onChange={e => setVozAtexto(e.target.value)}
              placeholder="Tu dictado aparecerá aquí..."
              rows={15}
            />
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button onClick={() => generatePDF(vozAtexto)}>📄 Exportar PDF</button>
              <button onClick={() => generateWord(vozAtexto)}>📝 Exportar Word</button>
            </div>
          </>
        )}
      </section>

      {/* ✅ Botón de cerrar sesión al final */}
      <div className="contenedor-cierre">
        <button className="boton-cerrar-sesion" onClick={cerrarSesion}>
          🔒 Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default SpeaklyApp;





