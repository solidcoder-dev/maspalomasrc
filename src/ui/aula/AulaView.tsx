import type { AulaInfo } from "../../domain/aula";

type AulaViewProps = {
  aula: AulaInfo | null;
  error: string | null;
  isLoading: boolean;
};

function AulaView({ aula, error, isLoading }: AulaViewProps) {
  return (
    <section>
      <h1 className="h4 fw-bold mb-3">Aula de Rugby</h1>
      {error && (
        <p className="text-danger mb-3" role="alert">
          {error}
        </p>
      )}
      {isLoading && !error && (
        <p className="text-body-secondary mb-3">Cargando información...</p>
      )}
      {aula && !error && (
        <>
          <div className="mb-4">
            <h2 className="h5 fw-semibold mb-2">{aula.title}</h2>
            <p className="text-body-emphasis mb-2">{aula.subtitle}</p>
            <p className="text-body-emphasis mb-0">{aula.description}</p>
          </div>
          <div className="mb-4 p-3 border rounded-3 bg-body-tertiary">
            <h3 className="h6 fw-semibold mb-2">Entrenamientos</h3>
            <p className="mb-1">{aula.trainings.schedule}</p>
            <p className="text-body-secondary mb-2">{aula.trainings.location}</p>
            <a
              className="btn btn-outline-primary btn-sm"
              href={aula.trainings.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Ver ubicación
            </a>
          </div>
          <div className="mb-3">
            <h3 className="h6 fw-semibold mb-2">{aula.approach.title}</h3>
            <ul className="mb-0">
              {aula.approach.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}

export default AulaView;
