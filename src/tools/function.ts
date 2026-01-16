import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { BirthCerticat } from "../data/typeData";

export const generateMultipleActsPDF = async (
  acts: BirthCerticat[],
  setCurrentIndex: (i: number) => void,
  renderRef: HTMLDivElement
) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = 210;
  const pageHeight = 297;

  for (let i = 0; i < acts.length; i++) {
    // 🔁 changer l’acte affiché
    setCurrentIndex(i);

    // ⏳ attendre le rendu React
    await new Promise((r) => setTimeout(r, 400));

    const canvas = await html2canvas(renderRef, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let finalWidth = pageWidth;
    let finalHeight = imgHeight;

    if (imgHeight > pageHeight) {
      const ratio = pageHeight / imgHeight;
      finalWidth *= ratio;
      finalHeight = pageHeight;
    }

    if (i > 0) pdf.addPage();

    pdf.addImage(
      imgData,
      "JPEG",
      (pageWidth - finalWidth),
      0,
      finalWidth,
      finalHeight
    );
  }

  pdf.save("Actes_de_naissance.pdf");
};
