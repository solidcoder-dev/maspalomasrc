import { useEffect, useState } from "react";
import type {
  RugbyKidsCtaDTO,
  RugbyKidsInsuranceDTO,
  RugbyKidsIntroDTO,
  RugbyKidsPricingDTO,
  RugbyKidsScheduleDTO
} from "../../domain/rugbyKids";
import type { RugbyKidsContentPort } from "../../ports/rugby-kids-content-port";

type UseRugbyKidsPresenterConfig = { rugbyKidsContentPort: RugbyKidsContentPort };

export const useRugbyKidsPresenter = ({ rugbyKidsContentPort }: UseRugbyKidsPresenterConfig) => {
  const [intro, setIntro] = useState<RugbyKidsIntroDTO | null>(null);
  const [schedule, setSchedule] = useState<RugbyKidsScheduleDTO | null>(null);
  const [pricing, setPricing] = useState<RugbyKidsPricingDTO | null>(null);
  const [insurance, setInsurance] = useState<RugbyKidsInsuranceDTO | null>(null);
  const [cta, setCta] = useState<RugbyKidsCtaDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setError(null);
    setIsLoading(true);
    Promise.all([
      rugbyKidsContentPort.getIntro(),
      rugbyKidsContentPort.getSchedule(),
      rugbyKidsContentPort.getPricing(),
      rugbyKidsContentPort.getInsurance(),
      rugbyKidsContentPort.getCta()
    ])
      .then(([nextIntro, nextSchedule, nextPricing, nextInsurance, nextCta]) => {
        if (!active) return;
        setIntro(nextIntro); setSchedule(nextSchedule); setPricing(nextPricing);
        setInsurance(nextInsurance); setCta(nextCta);
      })
      .catch(() => { if (active) setError("No pudimos cargar la información de Rugby Kids."); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [rugbyKidsContentPort]);

  return { intro, schedule, pricing, insurance, cta, error, isLoading };
};
