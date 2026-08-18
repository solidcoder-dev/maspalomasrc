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
  initialData?: HomePresenterData;
};

export type HomePresenterData = {
  intro: HomeIntroDTO;
  rugbyKidsPromo: HomeRugbyKidsPromoDTO;
  partnership: HomePartnershipDTO;
  values: HomeValuesDTO;
  competition: HomeCompetitionDTO;
  training: HomeTrainingDTO;
  inclusion: HomeInclusionDTO;
  sponsors: HomeSponsorsDTO;
  cta: HomeCtaDTO;
  socials: HomeSocialsDTO;
};

export const useHomePresenter = ({ homeContentPort, initialData }: UseHomePresenterConfig) => {
  const [intro, setIntro] = useState<HomeIntroDTO | null>(initialData?.intro ?? null);
  const [partnership, setPartnership] = useState<HomePartnershipDTO | null>(initialData?.partnership ?? null);
  const [rugbyKidsPromo, setRugbyKidsPromo] = useState<HomeRugbyKidsPromoDTO | null>(initialData?.rugbyKidsPromo ?? null);
  const [values, setValues] = useState<HomeValuesDTO | null>(initialData?.values ?? null);
  const [competition, setCompetition] = useState<HomeCompetitionDTO | null>(initialData?.competition ?? null);
  const [training, setTraining] = useState<HomeTrainingDTO | null>(initialData?.training ?? null);
  const [inclusion, setInclusion] = useState<HomeInclusionDTO | null>(initialData?.inclusion ?? null);
  const [sponsors, setSponsors] = useState<HomeSponsorsDTO | null>(initialData?.sponsors ?? null);
  const [cta, setCta] = useState<HomeCtaDTO | null>(initialData?.cta ?? null);
  const [socials, setSocials] = useState<HomeSocialsDTO | null>(initialData?.socials ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) return;
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
  }, [homeContentPort, initialData]);

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
