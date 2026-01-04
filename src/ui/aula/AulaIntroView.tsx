import type { AulaInfo } from "../../domain/aula";

type AulaIntroViewProps = {
  aula: AulaInfo;
};

function AulaIntroView({ aula }: AulaIntroViewProps) {
  return (
    <div className="mb-4 p-4 p-md-5 border rounded-4 bg-body-tertiary shadow-sm">
      <h2 className="h4 fw-semibold mb-2">{aula.title}</h2>
      <p className="text-body-emphasis mb-3">{aula.subtitle}</p>
      <p className="text-body-emphasis mb-0">{aula.description}</p>
    </div>
  );
}

export default AulaIntroView;
