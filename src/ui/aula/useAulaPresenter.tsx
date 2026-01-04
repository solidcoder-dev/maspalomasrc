import { useEffect, useState } from "react";
import type { AulaInfo } from "../../domain/aula";
import type { AulaPort } from "../../ports/aula-port";

type UseAulaPresenterConfig = {
  aulaPort: AulaPort;
};

export const useAulaPresenter = ({ aulaPort }: UseAulaPresenterConfig) => {
  const [aula, setAula] = useState<AulaInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setError(null);
    setIsLoading(true);

    aulaPort
      .getAula()
      .then((data) => {
        if (active) setAula(data);
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
  }, [aulaPort]);

  return { aula, error, isLoading };
};
