// src/views/VistaDocumento.jsx

import React, { useState } from "react";
import Exportador from "../components/Exportador"; // Asegúrate que la ruta sea correcta

const VistaDocumento = () => {
  const [textoDictado, setTextoDictado] = useState("");

  // Simulación: podrías actualizar el texto desde otro componente o evento
  // Por ejemplo, desde un textarea o desde el resultado del dictado por voz

  return (
    <section style={{ padding: "1rem" }}>
      <h2>Vista tipo documento</h2>

      {/* Simulación de entrada de texto */}
      <textarea
        value={textoDictado}
        onChange={(e) => setTextoDictado(e.target.value)}
        placeholder="Escribe o dicta tu texto aquí..."
        style={{ width: "100%", height: "150px", marginBottom: "1rem" }}
      />

      {/* Vista del texto dictado */}
      <p>{textoDictado}</p>

      {/* Botones para exportar */}
      <Exportador texto={textoDictado} />
    </section>
  );
};

export default VistaDocumento;

