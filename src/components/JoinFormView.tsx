import type { FormEvent } from "react";
import { Link } from "react-router-dom";

export type JoinFormValues = {
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  dni: string;
  nacimiento: string;
  direccion: string;
  codigoPostal: string;
  localizacion: string;
  importe: string;
  justificante: File | null;
  acceptPrivacy: boolean;
};

type JoinFormViewProps = {
  values: JoinFormValues;
  onChange: (field: keyof JoinFormValues, value: string) => void;
  onFileChange: (file: File | null) => void;
  onCheckboxChange: (checked: boolean) => void;
  errors: Partial<Record<keyof JoinFormValues, string>>;
  submitDisabled: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function JoinFormView({
  values,
  onChange,
  onFileChange,
  onCheckboxChange,
  errors,
  submitDisabled,
  onSubmit
}: JoinFormViewProps) {
  return (
    <form className="row g-3" onSubmit={onSubmit}>
      <div className="col-md-6">
        <label className="form-label" htmlFor="nombre">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
          value={values.nombre}
          onChange={(e) => onChange("nombre", e.target.value)}
          required
        />
        {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="apellidos">
          Apellidos
        </label>
        <input
          id="apellidos"
          name="apellidos"
          type="text"
          className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
          value={values.apellidos}
          onChange={(e) => onChange("apellidos", e.target.value)}
          required
        />
        {errors.apellidos && (
          <div className="invalid-feedback">{errors.apellidos}</div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="telefono">
          Teléfono
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
          value={values.telefono}
          onChange={(e) => onChange("telefono", e.target.value)}
          required
        />
        {errors.telefono && (
          <div className="invalid-feedback">{errors.telefono}</div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="dni">
          DNI
        </label>
        <input
          id="dni"
          name="dni"
          type="text"
          className={`form-control ${errors.dni ? "is-invalid" : ""}`}
          value={values.dni}
          onChange={(e) => onChange("dni", e.target.value)}
          required
        />
        {errors.dni && <div className="invalid-feedback">{errors.dni}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="nacimiento">
          Fecha de nacimiento
        </label>
        <input
          id="nacimiento"
          name="nacimiento"
          type="date"
          className={`form-control ${errors.nacimiento ? "is-invalid" : ""}`}
          value={values.nacimiento}
          onChange={(e) => onChange("nacimiento", e.target.value)}
          required
        />
        {errors.nacimiento && (
          <div className="invalid-feedback">{errors.nacimiento}</div>
        )}
      </div>
      <div className="col-md-12">
        <label className="form-label" htmlFor="direccion">
          Dirección
        </label>
        <input
          id="direccion"
          name="direccion"
          type="text"
          className={`form-control ${errors.direccion ? "is-invalid" : ""}`}
          value={values.direccion}
          onChange={(e) => onChange("direccion", e.target.value)}
        />
        {errors.direccion && (
          <div className="invalid-feedback">{errors.direccion}</div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="codigoPostal">
          Código postal
        </label>
        <input
          id="codigoPostal"
          name="codigoPostal"
          type="text"
          className={`form-control ${errors.codigoPostal ? "is-invalid" : ""}`}
          value={values.codigoPostal}
          onChange={(e) => onChange("codigoPostal", e.target.value)}
        />
        {errors.codigoPostal && (
          <div className="invalid-feedback">{errors.codigoPostal}</div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="localizacion">
          Localización
        </label>
        <input
          id="localizacion"
          name="localizacion"
          type="text"
          className={`form-control ${errors.localizacion ? "is-invalid" : ""}`}
          value={values.localizacion}
          onChange={(e) => onChange("localizacion", e.target.value)}
        />
        {errors.localizacion && (
          <div className="invalid-feedback">{errors.localizacion}</div>
        )}
      </div>
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
      <div className="col-12">
        <div className="form-check">
          <input
            id="privacidad"
            className={`form-check-input ${
              errors.acceptPrivacy ? "is-invalid" : ""
            }`}
            type="checkbox"
            checked={values.acceptPrivacy}
            onChange={(e) => onCheckboxChange(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="privacidad">
            He leído y acepto la{" "}
            <Link to="/privacidad">política de privacidad</Link> y el{" "}
            <Link to="/aviso-legal">aviso legal</Link>
          </label>
          {errors.acceptPrivacy && (
            <div className="invalid-feedback d-block">
              {errors.acceptPrivacy}
            </div>
          )}
        </div>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary" disabled={submitDisabled}>
          Enviar solicitud
        </button>
      </div>
    </form>
  );
}

export default JoinFormView;
