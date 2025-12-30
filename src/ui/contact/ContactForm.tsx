import type { ContactPresenter } from "./useContactPresenter";
import ContactFormView from "./ContactFormView";

type ContactFormProps = Pick<
  ContactPresenter,
  "values" | "errors" | "isSubmitting" | "onChange" | "onSubmit"
>;

function ContactForm(props: ContactFormProps) {
  return <ContactFormView {...props} />;
}

export default ContactForm;
