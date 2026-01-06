import { Link } from "react-router-dom";
import type { AulaCtaDTO } from "../../domain/aula";

type AulaCtaViewProps = {
  cta: AulaCtaDTO;
};

function AulaCtaView({ cta }: AulaCtaViewProps) {
  return (
    <div className="mt-4 p-4 p-md-5 border rounded-4 bg-primary-subtle">
      <h3 className="h5 fw-semibold mb-2">{cta.title}</h3>
      <p className="text-body-emphasis mb-3">{cta.description}</p>
      <div className="d-flex flex-wrap gap-2">
        <Link to={cta.primary.href} className="btn btn-primary btn-sm">
          {cta.primary.label}
        </Link>
        <Link to={cta.secondary.href} className="btn btn-outline-primary btn-sm">
          {cta.secondary.label}
        </Link>
      </div>
    </div>
  );
}

export default AulaCtaView;
