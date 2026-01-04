import type { AulaDTO } from "../../domain/aula";

type AulaTrainingViewProps = {
  trainings: AulaDTO["trainings"];
};

function AulaTrainingView({ trainings }: AulaTrainingViewProps) {
  return (
    <div className="h-100 p-4 p-md-5 border rounded-4 bg-body shadow-sm">
      <div className="d-flex flex-column gap-2 mb-3">
        <span className="text-uppercase small text-body-secondary">
          Entrenamientos
        </span>
        <h3 className="h5 fw-semibold mb-0">{trainings.schedule}</h3>
      </div>
      <p className="text-body-secondary mb-4">{trainings.location}</p>
      <a
        className="btn btn-outline-primary btn-sm"
        href={trainings.mapsUrl}
        target="_blank"
        rel="noreferrer"
      >
        Ver ubicación
      </a>
    </div>
  );
}

export default AulaTrainingView;
