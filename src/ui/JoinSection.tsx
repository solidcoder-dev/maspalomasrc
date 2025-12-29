import JoinRequestForm from "./join/JoinRequestForm";
import type { Club } from "../domain/club";
import type { SepaMandatePort } from "../ports/sepa-mandate-port";
import type { JoinRequestStoragePort } from "../ports/join-request-storage-port";
import { submitJoinRequest } from "../application/join/submitJoinRequest";
import type { JoinRequestValues } from "../application/join/joinRequestPresenter";

type JoinSectionProps = {
  club: Club | null;
  sepaMandatePort: SepaMandatePort;
  storagePort: JoinRequestStoragePort;
};

function JoinSection({ club, sepaMandatePort, storagePort }: JoinSectionProps) {
  const handleJoinRequest = (values: JoinRequestValues) => {
    if (!club) return;
    const mandate = submitJoinRequest({
      values,
      club,
      sepaMandatePort,
      storagePort
    });
    console.log("Mandato SEPA generado", mandate);
  };

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h1 className="card-title h4 fw-bold mb-3">Únete</h1>
        <p className="text-secondary mb-4">
          Completa el formulario para iniciar el alta. Nos pondremos en contacto
          contigo para confirmar los próximos pasos.
        </p>
        <JoinRequestForm onSubmitRequest={handleJoinRequest} />
      </div>
    </section>
  );
}

export default JoinSection;
