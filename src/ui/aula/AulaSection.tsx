import type { AulaContentPort } from "../../ports/aula-content-port";
import AulaApproachView from "./AulaApproachView";
import AulaAudienceView from "./AulaAudienceView";
import AulaCtaView from "./AulaCtaView";
import AulaIntroView from "./AulaIntroView";
import AulaPartnershipView from "./AulaPartnershipView";
import AulaSocialsView from "./AulaSocialsView";
import AulaTrainingView from "./AulaTrainingView";
import { useAulaPresenter } from "./useAulaPresenter";

type AulaSectionProps = {
  aulaContentPort: AulaContentPort;
};

function AulaSection({ aulaContentPort }: AulaSectionProps) {
  const {
    intro,
    audience,
    training,
    approach,
    partnership,
    cta,
    socials,
    error,
    isLoading
  } =
    useAulaPresenter({ aulaContentPort });

  return (
    <section>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
        <h1 className="h4 fw-bold mb-0">Aula de Rugby</h1>
        <span className="badge bg-primary-subtle text-primary-emphasis">
          Formación
        </span>
      </div>
      {error && (
        <p className="text-danger mb-3" role="alert">
          {error}
        </p>
      )}
      {isLoading && !error && (
        <p className="text-body-secondary mb-3">Cargando información...</p>
      )}
      {intro && audience && training && approach && partnership && cta && socials && !error && (
        <>
          <AulaIntroView intro={intro} />
          <AulaPartnershipView partnership={partnership} />
          <div className="row g-4">
            <div className="col-lg-6">
              <AulaAudienceView audience={audience} />
            </div>
            <div className="col-lg-6">
              <AulaApproachView approach={approach} />
            </div>
          </div>
          <div className="mt-4">
            <AulaTrainingView trainings={training} />
          </div>
          <div className="mt-4">
            <AulaSocialsView socials={socials} />
          </div>
          <AulaCtaView cta={cta} />
        </>
      )}
    </section>
  );
}

export default AulaSection;
