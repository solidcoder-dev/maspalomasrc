import type { AulaDTO } from "../../domain/aula";

type AulaPartnershipViewProps = {
  partnership: AulaDTO["partnership"];
};

function AulaPartnershipView({ partnership }: AulaPartnershipViewProps) {
  return (
    <div className="mb-4 p-4 p-md-5 border rounded-4 bg-body shadow-sm">
      <span className="text-uppercase small text-body-secondary">
        Partnership
      </span>
      <h3 className="h5 fw-semibold mt-2 mb-2">{partnership.title}</h3>
      <p className="text-body-emphasis mb-0">{partnership.description}</p>
    </div>
  );
}

export default AulaPartnershipView;
