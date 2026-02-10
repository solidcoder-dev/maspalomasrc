import { useEffect, useState } from "react";
import type {
  JoinEnrollmentDTO,
  JoinFeesDTO,
  JoinIntroDTO
} from "../../domain/joinContent";
import type { JoinContentPort } from "../../ports/join-content-port";

type UseJoinPresenterConfig = {
  joinContentPort: JoinContentPort;
};

export const useJoinPresenter = ({ joinContentPort }: UseJoinPresenterConfig) => {
  const [intro, setIntro] = useState<JoinIntroDTO | null>(null);
  const [fees, setFees] = useState<JoinFeesDTO | null>(null);
  const [enrollment, setEnrollment] = useState<JoinEnrollmentDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, [joinContentPort]);

  return {
    intro,
    fees,
    enrollment,
    error,
    isLoading
  };
};
