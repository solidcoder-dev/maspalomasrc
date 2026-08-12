import { useEffect, useState } from "react";
import type {
  HomeCompetitionDTO,
  HomeCtaDTO,
  HomeInclusionDTO,
  HomeIntroDTO,
  HomePartnershipDTO,
  HomeRugbyKidsPromoDTO,
  HomeSponsorsDTO,
  HomeSocialsDTO,
  HomeTrainingDTO,
  HomeValuesDTO
} from "../../domain/home";
import type { HomeContentPort } from "../../ports/home-content-port";

type UseHomePresenterConfig = {
  homeContentPort: HomeContentPort;
};

export const useHomePresenter = ({ homeContentPort }: UseHomePresenterConfig) => {
  const [intro, setIntro] = useState<HomeIntroDTO | null>(null);
  const [partnership, setPartnership] = useState<HomePartnershipDTO | null>(null);
  const [rugbyKidsPromo, setRugbyKidsPromo] = useState<HomeRugbyKidsPromoDTO | null>(null);
  const [values, setValues] = useState<HomeValuesDTO | null>(null);
  const [competition, setCompetition] = useState<HomeCompetitionDTO | null>(null);
  const [training, setTraining] = useState<HomeTrainingDTO | null>(null);
  const [inclusion, setInclusion] = useState<HomeInclusionDTO | null>(null);
  const [sponsors, setSponsors] = useState<HomeSponsorsDTO | null>(null);
  const [cta, setCta] = useState<HomeCtaDTO | null>(null);
  const [socials, setSocials] = useState<HomeSocialsDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setError(null);
    setIsLoading(true);

    Promise.all([
      homeContentPort.getIntro(),
      homeContentPort.getRugbyKidsPromo(),
      homeContentPort.getPartnership(),
      homeContentPort.getValues(),
      homeContentPort.getCompetition(),
      homeContentPort.getTraining(),
      homeContentPort.getInclusion(),
      homeContentPort.getSponsors(),
      homeContentPort.getCta(),
      homeContentPort.getSocials()
    ])
      .then(
        ([
          nextIntro,
          nextRugbyKidsPromo,
          nextPartnership,
          nextValues,
          nextCompetition,
          nextTraining,
          nextInclusion,
          nextSponsors,
          nextCta,
          nextSocials
        ]) => {
          if (!active) return;
          setIntro(nextIntro);
          setRugbyKidsPromo(nextRugbyKidsPromo);
          setPartnership(nextPartnership);
          setValues(nextValues);
          setCompetition(nextCompetition);
          setTraining(nextTraining);
          setInclusion(nextInclusion);
          setSponsors(nextSponsors);
          setCta(nextCta);
          setSocials(nextSocials);
        }
      )
      .catch(() => {
        if (active) setError("No pudimos cargar la información del club.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [homeContentPort]);

  return {
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
  };
};
