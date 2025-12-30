import ContactForm from "./contact/ContactForm";
import ContactStatusView from "./contact/ContactStatusView";
import ContactTrainingView from "./contact/ContactTrainingView";
import type { Club } from "../domain/club";
import { useContactPresenter } from "./contact/useContactPresenter";

type ContactSectionProps = {
  club: Club | null;
  onSubmitContact: (payload: {
    name: string;
    email: string;
    message: string;
    recipientEmail: string;
  }) => Promise<void> | void;
};

function ContactSection({ club, onSubmitContact }: ContactSectionProps) {
  const presenter = useContactPresenter({
    onSubmitContact,
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
        <ContactTrainingView training={club?.training} />
        <ContactStatusView status={presenter.status} />
        <ContactForm {...presenter} />
      </div>
    </section>
  );
}

export default ContactSection;
