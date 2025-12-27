import type { JoinFormValues } from "../JoinForm.types";

type MembershipFormViewProps = {
  values: JoinFormValues;
  errors: Partial<Record<keyof JoinFormValues, string>>;
  onChange: (field: keyof JoinFormValues, value: string) => void;
  onFileChange: (file: File | null) => void;
};

function MembershipFormView({
  values,
  errors,
  onChange,
  onFileChange
}: MembershipFormViewProps) {
  return (
    <>
      <div className="col-md-6">
        <label className="form-label" htmlFor="importe">
          Importe
        </label>
        <select
          id="importe"
          name="importe"
          className={`form-select ${errors.importe ? "is-invalid" : ""}`}
          value={values.importe}
          onChange={(e) => onChange("importe", e.target.value)}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="15">15 €/mes · externos</option>
          <option value="10">10 €/mes · estudiantes</option>
        </select>
        {errors.importe && (
          <div className="invalid-feedback">{errors.importe}</div>
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
          className={`form-control ${errors.justificante ? "is-invalid" : ""}`}
          accept=".pdf,image/*"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />
        <div className="form-text">
          Solo requerido para estudiantes (10 €/mes). Acepta PDF o imagen.
        </div>
        {errors.justificante && (
          <div className="invalid-feedback">{errors.justificante}</div>
        )}
      </div>
    </>
  );
}

export default MembershipFormView;
