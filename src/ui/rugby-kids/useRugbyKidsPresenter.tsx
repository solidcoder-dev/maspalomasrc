import { useEffect, useState } from "react";
import type {
  RugbyKidsCtaDTO,
  RugbyKidsInsuranceDTO,
  RugbyKidsIntroDTO,
  RugbyKidsPricingDTO,
  RugbyKidsScheduleDTO
} from "../../domain/rugbyKids";
import type { RugbyKidsContentPort } from "../../ports/rugby-kids-content-port";

type UseRugbyKidsPresenterConfig = { rugbyKidsContentPort: RugbyKidsContentPort; initialData?: RugbyKidsPresenterData };

export type RugbyKidsPresenterData = {
  intro: RugbyKidsIntroDTO;
  schedule: RugbyKidsScheduleDTO;
  pricing: RugbyKidsPricingDTO;
  insurance: RugbyKidsInsuranceDTO;
  cta: RugbyKidsCtaDTO;
};

export const useRugbyKidsPresenter = ({ rugbyKidsContentPort, initialData }: UseRugbyKidsPresenterConfig) => {
  const [intro, setIntro] = useState<RugbyKidsIntroDTO | null>(initialData?.intro ?? null);
  const [schedule, setSchedule] = useState<RugbyKidsScheduleDTO | null>(initialData?.schedule ?? null);
  const [pricing, setPricing] = useState<RugbyKidsPricingDTO | null>(initialData?.pricing ?? null);
  const [insurance, setInsurance] = useState<RugbyKidsInsuranceDTO | null>(initialData?.insurance ?? null);
  const [cta, setCta] = useState<RugbyKidsCtaDTO | null>(initialData?.cta ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) return;
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
  }, [rugbyKidsContentPort, initialData]);

  return { intro, schedule, pricing, insurance, cta, error, isLoading };
};
