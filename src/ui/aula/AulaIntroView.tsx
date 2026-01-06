import type { AulaIntroDTO } from "../../domain/aula";

type AulaIntroViewProps = {
  intro: AulaIntroDTO;
};

function AulaIntroView({ intro }: AulaIntroViewProps) {
  return (
    <div className="mb-4 p-4 p-md-5 border rounded-4 bg-body-tertiary shadow-sm">
      <div className="row g-4 align-items-start">
        <div className="col-lg-7">
          <span className="text-uppercase small text-body-secondary">
            Aula de Rugby
          </span>
          <h2 className="h3 fw-semibold mt-2 mb-2">{intro.title}</h2>
          <p className="lead mb-3">{intro.subtitle}</p>
          <p className="text-body-emphasis mb-0">{intro.description}</p>
        </div>
        <div className="col-lg-5">
          <div className="d-grid gap-2">
            {intro.highlights.map((highlight) => (
              <div
                key={highlight}
                className="p-3 bg-body rounded-3 border"
              >
                <span className="small fw-semibold text-body-emphasis">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AulaIntroView;
