import ContactForm from "./contact/ContactForm";
import ContactStatusView from "./contact/ContactStatusView";
import { submitContactUseCase } from "../application/contact/submitContactUseCase";
import type { Club } from "../domain/club";
import type { NotificationPort } from "../ports/notification-port";
import { useContactPresenter } from "./contact/useContactPresenter";

type ContactSectionProps = {
  club: Club | null;
  notificationPort: NotificationPort;
};

function ContactSection({ club, notificationPort }: ContactSectionProps) {
  const presenter = useContactPresenter({
    onSubmitContact: (payload) => submitContactUseCase(payload, notificationPort),
    recipientEmail: club?.email || ""
  });

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h1 className="card-title h4 fw-bold mb-3">Contacto</h1>
        <p className="text-secondary mb-3">
          Escríbenos para coordinar entrenamientos, colaboraciones o resolver
          dudas sobre el club.
        </p>
        {club?.training && (
          <div className="mb-3 p-3 bg-light border rounded">
            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <h2 className="h6 mb-0">Entrenamientos</h2>
              <span className="badge bg-primary">
                {club.training.schedule}
              </span>
            </div>
            <div className="text-secondary mb-2">{club.training.location}</div>
            <a
              className="btn btn-outline-primary btn-sm"
              href={club.training.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Ver mapa
            </a>
          </div>
        )}
        <ContactStatusView status={presenter.status} />
        <ContactForm {...presenter} />
      </div>
    </section>
  );
}

export default ContactSection;
