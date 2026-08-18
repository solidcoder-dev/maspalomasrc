import { useEffect, useState } from "react";
import type {
  AulaApproachDTO,
  AulaAudienceDTO,
  AulaCtaDTO,
  AulaIntroDTO,
  AulaPartnershipDTO,
  AulaSocialsDTO,
  AulaTrainingDTO
} from "../../domain/aula";
import type { AulaContentPort } from "../../ports/aula-content-port";

type UseAulaPresenterConfig = {
  aulaContentPort: AulaContentPort;
  initialData?: AulaPresenterData;
};

export type AulaPresenterData = {
  intro: AulaIntroDTO;
  audience: AulaAudienceDTO;
  training: AulaTrainingDTO;
  approach: AulaApproachDTO;
  partnership: AulaPartnershipDTO;
  cta: AulaCtaDTO;
  socials: AulaSocialsDTO;
};

export const useAulaPresenter = ({ aulaContentPort, initialData }: UseAulaPresenterConfig) => {
  const [intro, setIntro] = useState<AulaIntroDTO | null>(initialData?.intro ?? null);
  const [audience, setAudience] = useState<AulaAudienceDTO | null>(initialData?.audience ?? null);
  const [training, setTraining] = useState<AulaTrainingDTO | null>(initialData?.training ?? null);
  const [approach, setApproach] = useState<AulaApproachDTO | null>(initialData?.approach ?? null);
  const [partnership, setPartnership] = useState<AulaPartnershipDTO | null>(initialData?.partnership ?? null);
  const [cta, setCta] = useState<AulaCtaDTO | null>(initialData?.cta ?? null);
  const [socials, setSocials] = useState<AulaSocialsDTO | null>(initialData?.socials ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) return;
    let active = true;
    setError(null);
    setIsLoading(true);

    Promise.all([
      aulaContentPort.getIntro(),
      aulaContentPort.getAudience(),
      aulaContentPort.getTraining(),
      aulaContentPort.getApproach(),
      aulaContentPort.getPartnership(),
      aulaContentPort.getCta(),
      aulaContentPort.getSocials()
    ])
      .then(
        ([
          nextIntro,
          nextAudience,
          nextTraining,
          nextApproach,
          nextPartnership,
          nextCta,
          nextSocials
        ]) => {
        if (!active) return;
        setIntro(nextIntro);
        setAudience(nextAudience);
        setTraining(nextTraining);
        setApproach(nextApproach);
        setPartnership(nextPartnership);
        setCta(nextCta);
        setSocials(nextSocials);
      })
      .catch(() => {
        if (active) setError("No pudimos cargar la información del Aula.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [aulaContentPort, initialData]);

  return {
    intro,
    audience,
    training,
    approach,
    partnership,
    cta,
    socials,
    error,
    isLoading
  };
};
