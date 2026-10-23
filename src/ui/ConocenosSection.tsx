import { Link } from "react-router-dom";
import groupPhoto from "../assets/conocenos/141758-blurred.png";
import socials from "../assets/home/socials.json";

const instagramUrl = socials.links.find(({ label }) => label === "Instagram")?.href;

function ConocenosSection() {
  return (
    <section className="conocenos-page" aria-labelledby="conocenos-title">
      <div className="conocenos-hero overflow-hidden rounded-4 shadow-sm">
        <img
          src={groupPhoto}
          alt="Grupo de personas entrenando rugby en un campo de Gran Canaria"
          className="conocenos-hero__image w-100 d-block"
          loading="eager"
        />
      </div>

      <div className="conocenos-content mx-auto text-center">
        <p className="conocenos-eyebrow mb-2">RUGBY PARA TODOS</p>
        <h1 id="conocenos-title" className="display-6 fw-bold mb-3">
          ¿Te animas a probar el rugby?
        </h1>
        <p className="lead text-body-secondary mb-4">
          Entrena con nosotros en Gran Canaria. No necesitas experiencia previa
        </p>

        <div className="d-grid gap-3">
          <Link to="/contacto" className="btn btn-primary btn-lg rounded-pill fw-semibold">
            Ven a probar el rugby
          </Link>
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary btn-lg rounded-pill fw-semibold"
            >
              Síguenos en Instagram
            </a>
          )}
          <Link to="/rugby-kids" className="btn btn-link text-decoration-none text-primary fw-semibold">
            Rugby Kids <span className="fw-normal text-body-secondary">· De 10 a 16 años</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ConocenosSection;
