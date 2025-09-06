import React from "react";
import { generatePDF } from "../utils/generatePDF";
import { generateWord } from "../utils/generateWord";

const Exportador = ({ texto }) => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <button onClick={() => generatePDF(texto)}>📄 Exportar PDF</button>
      <button onClick={() => generateWord(texto)}>📝 Exportar Word</button>
    </div>
  );
};

export default Exportador;
