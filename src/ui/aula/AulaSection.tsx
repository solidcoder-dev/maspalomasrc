import type { AulaPort } from "../../ports/aula-port";
import AulaApproachView from "./AulaApproachView";
import AulaIntroView from "./AulaIntroView";
import AulaPartnershipView from "./AulaPartnershipView";
import AulaTrainingView from "./AulaTrainingView";
import { useAulaPresenter } from "./useAulaPresenter";

type AulaSectionProps = {
  aulaPort: AulaPort;
};

function AulaSection({ aulaPort }: AulaSectionProps) {
  const { aula, error, isLoading } = useAulaPresenter({ aulaPort });

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
      {aula && !error && (
        <>
          <AulaIntroView aula={aula} />
          <AulaPartnershipView partnership={aula.partnership} />
          <div className="row g-4">
            <div className="col-lg-6">
              <AulaTrainingView trainings={aula.trainings} />
            </div>
            <div className="col-lg-6">
              <AulaApproachView approach={aula.approach} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default AulaSection;
