import jsPDF from "jspdf";

export const generatePDF = (text) => {
  const doc = new jsPDF();
  doc.text(text, 10, 10);
  doc.save("documento.pdf");
};
