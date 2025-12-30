import type {
  JoinRequestErrors,
  JoinRequestValues
} from "../../../application/join/joinRequestPresenter";

type MembershipFormViewProps = {
  values: JoinRequestValues;
  errors: JoinRequestErrors;
  onChange: (field: keyof JoinRequestValues, value: string) => void;
  onFileChange: (file: File | null) => void;
  onBlurField: (field: keyof JoinRequestValues) => void;
  shouldShowError: (field: keyof JoinRequestValues) => boolean;
};

function MembershipFormView({
  values,
  errors,
  onChange,
  onFileChange,
  onBlurField,
  shouldShowError
}: MembershipFormViewProps) {
  return (
    <>
      <div className="col-md-6">
        <label className="form-label" htmlFor="importe">
          Importe *
        </label>
        <select
          id="importe"
          name="importe"
          className={`form-select ${
            errors.importe && shouldShowError("importe") ? "is-invalid" : ""
          }`}
          aria-invalid={errors.importe && shouldShowError("importe")}
          aria-describedby={errors.importe ? "importe-error" : undefined}
          value={values.importe}
          onChange={(e) => onChange("importe", e.target.value)}
          onBlur={() => onBlurField("importe")}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="15">15 €/mes · externos</option>
          <option value="10">10 €/mes · estudiantes</option>
        </select>
        {errors.importe && shouldShowError("importe") && (
          <div className="invalid-feedback" id="importe-error">
            {errors.importe}
          </div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="justificante">
          Justificante (PDF o imagen)
        </label>
        <input
          id="justificante"
          name="justificante"
          type="file"
          className={`form-control ${
            errors.justificante && shouldShowError("justificante")
              ? "is-invalid"
              : ""
          }`}
          aria-invalid={errors.justificante && shouldShowError("justificante")}
          aria-describedby={
            errors.justificante ? "justificante-error" : undefined
          }
          accept=".pdf,image/*"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          onBlur={() => onBlurField("justificante")}
        />
        <div className="form-text">
          Solo requerido para estudiantes (10 €/mes). Acepta PDF o imagen.
        </div>
        {errors.justificante && shouldShowError("justificante") && (
          <div className="invalid-feedback" id="justificante-error">
            {errors.justificante}
          </div>
        )}
      </div>
    </>
  );
}

export default MembershipFormView;
