import { FC, useRef } from "react";
import { BirthCerticat } from "../../../data/typeData";
import jsPDF from "jspdf";
import ActItem from "../ui/Tools/ActItem";
import html2canvas from "html2canvas";
interface Props {
  birth: BirthCerticat;
  onClose: () => void;
}

const BirthCertificateModal: FC<Props> = ({ birth, onClose }) => {

  const pdfRef = useRef<HTMLDivElement>(null);
  const handlePrint = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Acte_de_naissance_${birth.name}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      {/* MODAL CONTAINER */}
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded shadow-xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl print:hidden"
        >
          ✕
        </button>
        <ActItem birth={birth} pdfRef={pdfRef} />
        <button onClick={handlePrint} className="fixed bottom-[5%] right-[50%] bg-blue-500 text-white px-4 py-2 rounded">
          Télécharger le PDF
        </button>
      </div>
    </div>
  );
};

export default BirthCertificateModal;
