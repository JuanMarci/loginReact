import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";

export const generateWord = (text) => {
  // Validación de entrada
  if (!text || text.trim() === "") {
    alert("No hay texto para exportar.");
    return;
  }

  // Construcción del documento con encabezado
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "Transcripción Speakly",
            heading: "Heading1",
          }),
          new Paragraph(text),
        ],
      },
    ],
  });

  // Generación y descarga del archivo
  Packer.toBlob(doc)
    .then((blob) => {
      saveAs(blob, "documento.docx");
      alert("✅ Documento Word exportado correctamente.");
    })
    .catch((error) => {
      console.error("Error al generar el documento:", error);
      alert("❌ Hubo un problema al exportar el documento.");
    });
};

