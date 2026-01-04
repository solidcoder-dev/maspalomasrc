import type { AulaPort } from "../../ports/aula-port";
import { useAulaPresenter } from "./useAulaPresenter";
import AulaView from "./AulaView";

type AulaSectionProps = {
  aulaPort: AulaPort;
};

function AulaSection({ aulaPort }: AulaSectionProps) {
  const { aula, error, isLoading } = useAulaPresenter({ aulaPort });

  return <AulaView aula={aula} error={error} isLoading={isLoading} />;
}

export default AulaSection;
