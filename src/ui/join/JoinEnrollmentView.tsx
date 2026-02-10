import type { JoinEnrollmentDTO } from "../../domain/joinContent";

type JoinEnrollmentViewProps = {
  enrollment: JoinEnrollmentDTO;
};

function JoinEnrollmentView({ enrollment }: JoinEnrollmentViewProps) {
  return (
    <div className="p-4 p-md-5 border rounded-4 bg-body shadow-sm">
      <span className="text-uppercase small text-body-secondary">
        Inscripción
      </span>
      <h3 className="h5 fw-semibold mt-2 mb-2">{enrollment.title}</h3>
      <p className="text-body-emphasis mb-4">{enrollment.description}</p>
      <div className="d-grid gap-3">
        {enrollment.options.map((option) => (
          <article
            key={option.title}
            className="p-4 border rounded-4 bg-body shadow-sm"
          >
            <h4 className="h5 fw-semibold mb-2">{option.title}</h4>
            <p className="text-body-secondary mb-3">{option.description}</p>
            <ul className="list-unstyled d-grid gap-2 mb-4">
              {option.bullets.map((bullet) => (
                <li key={bullet} className="d-flex gap-2 align-items-start">
                  <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis">
                    ✓
                  </span>
                  <span className="text-body-emphasis">{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex flex-wrap align-items-center gap-3">
              <a
                className="btn btn-primary"
                href={option.ctaUrl}
                target="_blank"
                rel="noreferrer"
              >
                {option.ctaLabel}
              </a>
              <span className="small text-body-secondary text-break">
                {option.ctaUrl}
              </span>
            </div>
          </article>
        ))}
        <div className="p-4 border rounded-4 bg-body-tertiary shadow-sm">
          <span className="text-uppercase small text-body-secondary">
            {enrollment.importantTitle}
          </span>
          <ul className="list-unstyled mt-3 mb-0 d-grid gap-2">
            {enrollment.importantItems.map((item) => (
              <li key={item} className="d-flex gap-2 align-items-start">
                <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis">
                  !
                </span>
                <span className="text-body-emphasis">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JoinEnrollmentView;
