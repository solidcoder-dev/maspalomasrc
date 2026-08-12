import type { HomeContentPort } from "../../ports/home-content-port";
import HomeCompetitionView from "./HomeCompetitionView";
import HomeCtaView from "./HomeCtaView";
import HomeInclusionView from "./HomeInclusionView";
import HomeIntroView from "./HomeIntroView";
import HomePartnershipView from "./HomePartnershipView";
import HomeRugbyKidsView from "./HomeRugbyKidsView";
import HomeSponsorsView from "./HomeSponsorsView";
import HomeSocialsView from "./HomeSocialsView";
import HomeTrainingView from "./HomeTrainingView";
import HomeValuesView from "./HomeValuesView";
import { useHomePresenter } from "./useHomePresenter";

type HomeSectionProps = {
  homeContentPort: HomeContentPort;
};

function HomeSection({ homeContentPort }: HomeSectionProps) {
  const {
    intro,
    rugbyKidsPromo,
    partnership,
    values,
    competition,
    training,
    inclusion,
    sponsors,
    cta,
    socials,
    error,
    isLoading
  } = useHomePresenter({ homeContentPort });

  return (
    <section>
      {error && (
        <p className="text-danger mb-3" role="alert">
          {error}
        </p>
      )}
      {isLoading && !error && (
        <p className="text-body-secondary mb-3">Cargando información...</p>
      )}
      {intro &&
        rugbyKidsPromo &&
        partnership &&
        values &&
        competition &&
        training &&
        inclusion &&
        sponsors &&
        cta &&
        socials &&
        !error && (
          <>
            <HomeIntroView intro={intro} />
            <HomeRugbyKidsView promo={rugbyKidsPromo} />
            <div className="mb-4">
              <HomeCtaView cta={cta} />
            </div>
            <HomePartnershipView partnership={partnership} />
            <div className="row g-4">
              <div className="col-lg-6">
                <HomeValuesView values={values} />
              </div>
              <div className="col-lg-6">
                <HomeCompetitionView competition={competition} />
              </div>
            </div>
            <div className="mt-4">
              <HomeTrainingView trainings={training} />
            </div>
            <div className="mt-4">
              <HomeInclusionView inclusion={inclusion} />
            </div>
            <div className="mt-4">
              <HomeSponsorsView sponsors={sponsors} />
            </div>
            <div className="mt-4">
              <HomeSocialsView socials={socials} />
            </div>
          </>
        )}
    </section>
  );
}

export default HomeSection;
