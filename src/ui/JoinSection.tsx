import JoinRequestForm from "./join/JoinRequestForm";
import type { Club } from "../domain/club";
import type { SepaMandatePort } from "../ports/sepa-mandate-port";
import type { JoinRequestStoragePort } from "../ports/join-request-storage-port";
import type { ClientContextPort } from "../ports/client-context-port";
import type { NotificationPort } from "../ports/notification-port";
import type { TemplateRendererPort } from "../ports/template-renderer-port";
import type { MandatePdfPort } from "../ports/mandate-pdf-port";
import { submitJoinRequestUseCase } from "../application/join/submitJoinRequestUseCase";
import type { JoinRequestValues } from "../application/join/joinRequestPresenter";

type JoinSectionProps = {
  club: Club | null;
  sepaMandatePort: SepaMandatePort;
  storagePort: JoinRequestStoragePort;
  clientContextPort: ClientContextPort;
  notificationPort: NotificationPort;
  templateRendererPort: TemplateRendererPort;
  mandatePdfPort: MandatePdfPort;
};

function JoinSection({
  club,
  sepaMandatePort,
  storagePort,
  clientContextPort,
  notificationPort,
  templateRendererPort,
  mandatePdfPort
}: JoinSectionProps) {
  const handleJoinRequest = async (values: JoinRequestValues) => {
    if (!club) return;
    const mandate = await submitJoinRequestUseCase({
      values,
      club,
      sepaMandatePort,
      storagePort,
      clientContextPort,
      notificationPort,
      templateRendererPort,
      mandatePdfPort
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
