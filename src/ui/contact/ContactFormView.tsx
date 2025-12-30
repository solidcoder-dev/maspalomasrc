import type { ContactPresenter } from "./useContactPresenter";

type ContactFormViewProps = Pick<
  ContactPresenter,
  "values" | "errors" | "isSubmitting" | "onChange" | "onSubmit"
>;

function ContactFormView({
  values,
  errors,
  isSubmitting,
  onChange,
  onSubmit
}: ContactFormViewProps) {
  return (
    <form className="row g-3" onSubmit={onSubmit}>
      <div className="col-md-6">
        <label className="form-label" htmlFor="contactName">
          Nombre *
        </label>
        <input
          id="contactName"
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          value={values.name}
          onChange={(e) => onChange("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contactName-error" : undefined}
          required
        />
        {errors.name && (
          <div className="invalid-feedback" id="contactName-error">
            {errors.name}
          </div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="contactEmail">
          Email *
        </label>
        <input
          id="contactEmail"
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contactEmail-error" : undefined}
          required
        />
        {errors.email && (
          <div className="invalid-feedback" id="contactEmail-error">
            {errors.email}
          </div>
        )}
      </div>
      <div className="col-12">
        <label className="form-label" htmlFor="contactMessage">
          Mensaje *
        </label>
        <textarea
          id="contactMessage"
          className={`form-control ${errors.message ? "is-invalid" : ""}`}
          rows={4}
          value={values.message}
          onChange={(e) => onChange("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contactMessage-error" : undefined
          }
          required
        />
        {errors.message && (
          <div className="invalid-feedback" id="contactMessage-error">
            {errors.message}
          </div>
        )}
      </div>
      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
}

export default ContactFormView;
