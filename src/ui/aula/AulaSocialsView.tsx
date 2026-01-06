import type { AulaSocialsDTO } from "../../domain/aula";

type AulaSocialsViewProps = {
  socials: AulaSocialsDTO;
};

function AulaSocialsView({ socials }: AulaSocialsViewProps) {
  return (
    <div className="h-100 p-4 p-md-5 border rounded-4 bg-body shadow-sm">
      <span className="text-uppercase small text-body-secondary">
        Comunidad
      </span>
      <h3 className="h5 fw-semibold mt-2 mb-3">{socials.title}</h3>
      <div className="d-flex flex-wrap gap-2">
        {socials.links.map((link) => (
          <a
            key={link.href}
            className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2"
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            <i
              className={`bi ${
                link.label.toLowerCase() === "facebook"
                  ? "bi-facebook"
                  : "bi-instagram"
              }`}
              aria-hidden="true"
            />
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default AulaSocialsView;
