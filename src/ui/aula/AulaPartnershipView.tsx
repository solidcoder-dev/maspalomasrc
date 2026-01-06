import type { AulaPartnershipDTO } from "../../domain/aula";

type AulaPartnershipViewProps = {
  partnership: AulaPartnershipDTO;
};

function AulaPartnershipView({ partnership }: AulaPartnershipViewProps) {
  return (
    <div className="mb-4 p-4 p-md-5 border rounded-4 bg-body shadow-sm">
      <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
        <span className="text-uppercase small text-body-secondary">
          Partnership
        </span>
        <span className="badge bg-primary-subtle text-primary-emphasis">
          ULPGC
        </span>
      </div>
      <h3 className="h5 fw-semibold mb-2">{partnership.title}</h3>
      <p className="text-body-emphasis mb-0">{partnership.description}</p>
    </div>
  );
}

export default AulaPartnershipView;
