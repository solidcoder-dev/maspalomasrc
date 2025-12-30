import type { Club } from "../../domain/club";

type ContactTrainingViewProps = {
  training: Club["training"] | undefined;
};

function ContactTrainingView({ training }: ContactTrainingViewProps) {
  if (!training) return null;

  return (
    <div className="mb-3 p-3 bg-light border rounded">
      <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
        <h2 className="h6 mb-0">Entrenamientos</h2>
        <span className="badge bg-primary">{training.schedule}</span>
      </div>
      <div className="text-secondary mb-2">{training.location}</div>
      <a
        className="btn btn-outline-primary btn-sm"
        href={training.mapsUrl}
        target="_blank"
        rel="noreferrer"
      >
        Ver mapa
      </a>
    </div>
  );
}

export default ContactTrainingView;
