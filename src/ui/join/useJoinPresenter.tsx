import { useEffect, useState } from "react";
import type {
  JoinEnrollmentDTO,
  JoinFeesDTO,
  JoinIntroDTO
} from "../../domain/joinContent";
import type { JoinContentPort } from "../../ports/join-content-port";

type UseJoinPresenterConfig = {
  joinContentPort: JoinContentPort;
  initialData?: JoinPresenterData;
};

export type JoinPresenterData = {
  intro: JoinIntroDTO;
  fees: JoinFeesDTO;
  enrollment: JoinEnrollmentDTO;
};

export const useJoinPresenter = ({ joinContentPort, initialData }: UseJoinPresenterConfig) => {
  const [intro, setIntro] = useState<JoinIntroDTO | null>(initialData?.intro ?? null);
  const [fees, setFees] = useState<JoinFeesDTO | null>(initialData?.fees ?? null);
  const [enrollment, setEnrollment] = useState<JoinEnrollmentDTO | null>(initialData?.enrollment ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) return;
    let active = true;
    setError(null);
    setIsLoading(true);

    Promise.all([
      joinContentPort.getIntro(),
      joinContentPort.getFees(),
      joinContentPort.getEnrollment()
    ])
      .then(
        ([
          nextIntro,
          nextFees,
          nextEnrollment
        ]) => {
          if (!active) return;
          setIntro(nextIntro);
          setFees(nextFees);
          setEnrollment(nextEnrollment);
        }
      )
      .catch(() => {
        if (active) setError("No pudimos cargar la información de la cuota.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [joinContentPort, initialData]);

  return {
    intro,
    fees,
    enrollment,
    error,
    isLoading
  };
};
