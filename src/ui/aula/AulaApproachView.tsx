import type { AulaDTO } from "../../domain/aula";

type AulaApproachViewProps = {
  approach: AulaDTO["approach"];
};

function AulaApproachView({ approach }: AulaApproachViewProps) {
  return (
    <div className="h-100 p-4 p-md-5 border rounded-4 bg-body shadow-sm">
      <h3 className="h5 fw-semibold mb-3">{approach.title}</h3>
      <div className="d-grid gap-3">
        {approach.points.map((point) => (
          <div key={point} className="d-flex gap-2 align-items-start">
            <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis">
              ✓
            </span>
            <span className="text-body-emphasis">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AulaApproachView;
