import { jsPDF } from "jspdf";
import type { MandatePdfPort } from "../ports/mandate-pdf-port";
import type { SepaMandate } from "../domain/sepa/mandate";

const line = (doc: jsPDF, y: number, label: string, value: string) => {
  const maxWidth = 180;
  const text = `${label}: ${value}`;
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, 14, y);
  return y + lines.length * 6;
};

const paragraph = (doc: jsPDF, y: number, text: string) => {
  const maxWidth = 180;
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, 14, y);
  return y + lines.length * 6;
};

export function createSepaMandatePdfAdapter(): MandatePdfPort {
  const download = (mandate: SepaMandate) => {
    const doc = new jsPDF();
    let y = 20;
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("MANDATO DE ADEUDO DIRECTO SEPA", 14, y);
    doc.setLineWidth(0.5);
    doc.line(14, y + 2, pageWidth - 14, y + 2);
    y += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Referencia del mandato", 14, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(mandate.mandateReference, 14, y + 6);
    y += 14;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Acreedor", 14, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y += 6;
    y = line(doc, y, "Nombre", mandate.clubName);
    y = line(doc, y, "Identificador del acreedor", mandate.sepaCreditorId);
    y = line(doc, y, "Dirección", mandate.clubAddress);
    y += 4;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Deudor", 14, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y += 6;
    y = line(doc, y, "Nombre", mandate.debtorName);
    y = line(doc, y, "Email", mandate.debtorEmail);
    y = line(doc, y, "IBAN", mandate.debtorIban);
    y = line(doc, y, "Dirección", mandate.debtorAddress);
    y += 4;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Detalles del adeudo", 14, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y += 6;
    y = line(doc, y, "Importe", `${mandate.amount.toFixed(2)} ${mandate.currency}`);
    y = line(doc, y, "Tipo de mandato", mandate.mandateType);
    y = line(doc, y, "Frecuencia", mandate.frequency);
    y = line(doc, y, "Tipo de secuencia", mandate.sequenceType);
    y += 4;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Cláusulas", 14, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    y += 6;
    y = paragraph(
      doc,
      y,
      "Mediante la firma de este mandato, el deudor autoriza al acreedor a enviar instrucciones a la entidad del deudor para adeudar su cuenta y a la entidad para efectuar los adeudos en su cuenta de acuerdo con las instrucciones del acreedor."
    );
    y = paragraph(
      doc,
      y + 2,
      "Como parte de sus derechos, el deudor está legitimado al reembolso por su entidad en los términos y condiciones del contrato suscrito con la misma. La solicitud de reembolso deberá efectuarse dentro de las ocho semanas siguientes a la fecha en que se adeudó en cuenta."
    );
    y += 2;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y = line(doc, y, "Fecha de firma", mandate.signedAt);
    y = line(doc, y, "IP de firma", mandate.signedFromIp);
    y = line(doc, y, "Agente de usuario", mandate.signedUserAgent);
    y += 4;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Firma del deudor", 14, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    if (mandate.signatureDataUrl.startsWith("data:image")) {
      try {
        doc.addImage(mandate.signatureDataUrl, "PNG", 14, y, 80, 30);
      } catch {
        doc.setFontSize(9);
        doc.text("No se pudo renderizar la firma.", 14, y + 6);
      }
    } else {
      doc.setFontSize(9);
      doc.text("Firma no disponible.", 14, y + 6);
    }

    const fileName = `sepa-mandate-${mandate.mandateReference}.pdf`;
    doc.save(fileName);
  };

  return { download };
}
