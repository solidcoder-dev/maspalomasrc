import type { AulaAudienceDTO } from "../../domain/aula";

type AulaAudienceViewProps = {
  audience: AulaAudienceDTO;
};

function AulaAudienceView({ audience }: AulaAudienceViewProps) {
  return (
    <div className="h-100 p-4 p-md-5 border rounded-4 bg-body shadow-sm">
      <span className="text-uppercase small text-body-secondary">
        Público
      </span>
      <h3 className="h5 fw-semibold mt-2 mb-3">{audience.title}</h3>
      <ul className="list-unstyled mb-0 d-grid gap-2">
        {audience.points.map((point) => (
          <li key={point} className="d-flex gap-2 align-items-start">
            <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis">
              ✓
            </span>
            <span className="text-body-emphasis">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AulaAudienceView;
