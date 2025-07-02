import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Conversor() {  
  const [textoAvoz, setTextoAvoz] = useState("")
  const [vozAtexto, setVozAtexto] = useState("")  

  function cambiarTextoAvoz(evento) {
    setTextoAvoz(evento.target.value)
  } 

  function convertirtextoAvoz() {
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(textoAvoz)
    synth.speak(utterance)
  }
function grabarVozAtexto() {
  const recognition = new window.webkitSpeechRecognition()
  recognition.lang = 'es-ES'
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.start()

  recognition.onresult = function (event) {
    const result = event.results[0][0].transcript
    setVozAtexto(result)
    console.log('Voz a texto:', result)
  }
}

return (
  <>
    <h1>Conversor TTS y STT</h1>
    <br />
    <h3>Conversor de texto a voz</h3>
    <input type="text" id="textoAvoz" value={textoAvoz} onChange={cambiarTextoAvoz} />
    <button onClick={convertirtextoAvoz}>Convertir</button>

    <h3>Conversor de voz a texto</h3>
    <button onClick={grabarVozAtexto}>Grabar</button>    
    <p>Texto grabado: {vozAtexto}</p>
  </>
);
}

export default Conversor
// import { useState } from 'react'