import ContactForm from "./contact/ContactForm";
import ContactStatusView from "./contact/ContactStatusView";
import type { Club } from "../domain/club";
import { useContactPresenter } from "./contact/useContactPresenter";

type ContactSectionProps = {
  club: Club | null;
  submitContactUseCase: (payload: {
    name: string;
    email: string;
    message: string;
    recipientEmail: string;
  }) => Promise<void> | void;
};

function ContactSection({ club, submitContactUseCase }: ContactSectionProps) {
  const presenter = useContactPresenter({
    onSubmitContact: submitContactUseCase,
    recipientEmail: club?.email || ""
  });

  return (
    <section>
        <h1 className="card-title h4 fw-bold mb-3">Contacto</h1>
        <p className="text-body-emphasis mb-3">
          Escríbenos para coordinar entrenamientos, colaboraciones o resolver
          dudas sobre el club.
        </p>
        <ContactStatusView status={presenter.status} />
        <ContactForm {...presenter} />
    </section>
  );
}

export default ContactSection;
