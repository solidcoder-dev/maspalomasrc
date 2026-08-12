import { Link } from "react-router-dom";
import type { HomeRugbyKidsPromoDTO } from "../../domain/home";

type HomeRugbyKidsViewProps = {
  promo: HomeRugbyKidsPromoDTO;
};

function HomeRugbyKidsView({ promo }: HomeRugbyKidsViewProps) {
  return (
    <section className="mb-4 p-4 p-md-5 border rounded-4 bg-body-tertiary shadow-sm" aria-labelledby="home-rugby-kids-title">
      <div className="row g-4 align-items-center">
        <div className="col-lg-8">
          <span className="text-uppercase small text-body-secondary">{promo.label}</span>
          <h2 id="home-rugby-kids-title" className="h3 fw-semibold mt-2 mb-2">{promo.title}</h2>
          <p className="text-body-emphasis mb-0">{promo.description}</p>
        </div>
        <div className="col-lg-4">
          <div className="d-flex flex-column align-items-start align-items-lg-end gap-3">
            <span className="badge bg-primary-subtle text-primary-emphasis">{promo.age}</span>
            <Link to={promo.ctaHref} className="btn btn-primary">
              {promo.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeRugbyKidsView;
