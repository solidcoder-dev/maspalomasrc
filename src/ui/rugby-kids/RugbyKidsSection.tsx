import type { Club } from "../../domain/club";
import type { RugbyKidsContentPort } from "../../ports/rugby-kids-content-port";
import RugbyKidsCtaView from "./RugbyKidsCtaView";
import RugbyKidsInsuranceView from "./RugbyKidsInsuranceView";
import RugbyKidsIntroView from "./RugbyKidsIntroView";
import RugbyKidsPricingView from "./RugbyKidsPricingView";
import RugbyKidsScheduleView from "./RugbyKidsScheduleView";
import RugbyKidsTrainingView from "./RugbyKidsTrainingView";
import { useRugbyKidsPresenter, type RugbyKidsPresenterData } from "./useRugbyKidsPresenter";

type RugbyKidsSectionProps = { rugbyKidsContentPort: RugbyKidsContentPort; training: Club["training"]; initialData?: RugbyKidsPresenterData };

function RugbyKidsSection({ rugbyKidsContentPort, training, initialData }: RugbyKidsSectionProps) {
  const { intro, schedule, pricing, insurance, cta, error, isLoading } = useRugbyKidsPresenter({ rugbyKidsContentPort, initialData });
  return <section><div className="d-flex flex-wrap align-items-center gap-2 mb-4"><h1 className="h4 fw-bold mb-0">Rugby para niños y niñas en Las Palmas de Gran Canaria</h1><span className="badge bg-primary-subtle text-primary-emphasis">Rugby Kids</span></div>{error && <p className="text-danger mb-3" role="alert">{error}</p>}{isLoading && !error && <p className="text-body-secondary mb-3">Cargando información...</p>}{intro && schedule && pricing && insurance && cta && !error && <><RugbyKidsIntroView intro={intro} /><RugbyKidsScheduleView schedule={schedule} /><RugbyKidsPricingView pricing={pricing} /><RugbyKidsInsuranceView insurance={insurance} /><RugbyKidsTrainingView training={training} /><RugbyKidsCtaView cta={cta} /></>}</section>;
}

export default RugbyKidsSection;
