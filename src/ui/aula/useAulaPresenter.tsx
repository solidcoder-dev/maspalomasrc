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
};

export const useAulaPresenter = ({ aulaContentPort }: UseAulaPresenterConfig) => {
  const [intro, setIntro] = useState<AulaIntroDTO | null>(null);
  const [audience, setAudience] = useState<AulaAudienceDTO | null>(null);
  const [training, setTraining] = useState<AulaTrainingDTO | null>(null);
  const [approach, setApproach] = useState<AulaApproachDTO | null>(null);
  const [partnership, setPartnership] = useState<AulaPartnershipDTO | null>(null);
  const [cta, setCta] = useState<AulaCtaDTO | null>(null);
  const [socials, setSocials] = useState<AulaSocialsDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, [aulaContentPort]);

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
