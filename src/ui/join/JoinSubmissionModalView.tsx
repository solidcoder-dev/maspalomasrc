type JoinSubmissionModalViewProps = {
  playerName: string;
  clubEmail: string;
  pdfDataUrl: string;
  onClose: () => void;
};

function JoinSubmissionModalView({
  playerName,
  clubEmail,
  pdfDataUrl,
  onClose
}: JoinSubmissionModalViewProps) {
  const fileName = `mandato-sepa-${playerName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}.pdf`;

  return (
    <>
      <div className="modal show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Instrucciones de envío</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <p className="mb-2">
                Revisa la información del mandato y envía el documento al club
                para completar el alta.
              </p>
              <p className="mb-2">
                Email de envío: <strong>{clubEmail}</strong>
              </p>
              <a
                className="btn btn-outline-primary btn-sm"
                href={pdfDataUrl}
                download={fileName}
              >
                Descargar mandato
              </a>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}

export default JoinSubmissionModalView;
