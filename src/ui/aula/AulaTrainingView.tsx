import type { AulaTrainingDTO } from "../../domain/aula";
import AulaMapView from "./AulaMapView";

type AulaTrainingViewProps = {
  trainings: AulaTrainingDTO;
};

function AulaTrainingView({ trainings }: AulaTrainingViewProps) {
  return (
    <div className="h-100 p-4 p-md-5 border rounded-4 bg-primary-subtle">
      <div className="d-flex flex-column gap-2 mb-3">
        <span className="text-uppercase small text-body-secondary">
          Entrenamientos
        </span>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <h3 className="h3 fw-semibold mb-0">{trainings.schedule}</h3>
          <span className="badge bg-primary text-white">Horario</span>
        </div>
      </div>
      <p className="text-body-emphasis mb-4">{trainings.location}</p>
      <AulaMapView mapsUrl={trainings.mapsUrl} location={trainings.location} />
    </div>
  );
}

export default AulaTrainingView;
