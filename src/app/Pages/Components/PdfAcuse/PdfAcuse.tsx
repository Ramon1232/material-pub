import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "./styles.css";
import logo from "./logo.png";
import logo_pub from "./logo_pub.png";

export const App: React.FC = () => {
  const handlePrint = async () => {
    const input = document.getElementById("printable");

    if (input) {
      try {
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 size in mm
        const pageHeight = 295; // A4 size in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("document.pdf");
      } catch (error) {
        console.error("Error generating PDF: ", error);
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center mb-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Generar PDF
        </button>
      </div>
      <div
        id="printable"
        className="bg-white shadow-lg"
        style={{
          width: "8.5in",
          height: "11in",
          padding: "1in",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div className="encabezado">
          <img src={logo.src} alt="Logo" />
          <img src={logo_pub.src} alt="Logo Public" />
        </div>
        <div className="content">
          <h1>Acuse de Registro de Beneficiarios</h1>
          <p>
            <ul>
              <li>
                <strong>Fecha de Registro:</strong> 23/07/2024
              </li>
              <li>
                <strong>Dependencia:</strong> Nombre de la Dependencia
              </li>
              <li>
                <strong>Nombre del Archivo:</strong> Clave de la Dependencia
              </li>
              <li>
                <strong>Hora de Registro:</strong> 10:25 am
              </li>
              <li>
                <strong>Numero de Beneficiarios Registrados:</strong> 287
              </li>
            </ul>
          </p>
        </div>
        <div className="pie">
          <main>
            <h3>Revisa y Valida</h3>
            <h2>Enlace Responsable</h2>
            <p>(Nombre, Firma, Cargo y Dependencia, Entidad o Ayuntamiento)</p>
          </main>
          <main>
            <h3>Revisa y Valida</h3>
            <h2>Enlace Responsable</h2>
            <p>(Nombre, Firma, Cargo y Dependencia, Entidad o Ayuntamiento)</p>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
