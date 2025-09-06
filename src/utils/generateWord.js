import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";

export const generateWord = (text) => {
  const doc = new Document({
    sections: [
      {
        children: [new Paragraph(text)],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "documento.docx");
  });
};
