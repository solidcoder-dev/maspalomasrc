import type {
  JoinRequestErrors,
  JoinRequestValues
} from "../../../application/join/joinRequestPresenter";

type PlayerInfoFormViewProps = {
  values: JoinRequestValues;
  errors: JoinRequestErrors;
  onChange: (field: keyof JoinRequestValues, value: string) => void;
  onBlurField: (field: keyof JoinRequestValues) => void;
  shouldShowError: (field: keyof JoinRequestValues) => boolean;
};

function PlayerInfoFormView({
  values,
  errors,
  onChange,
  onBlurField,
  shouldShowError
}: PlayerInfoFormViewProps) {
  return (
    <>
      <div className="col-md-6">
        <label className="form-label" htmlFor="nombre">
          Nombre *
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className={`form-control ${
            errors.nombre && shouldShowError("nombre") ? "is-invalid" : ""
          }`}
          aria-invalid={errors.nombre && shouldShowError("nombre")}
          aria-describedby={errors.nombre ? "nombre-error" : undefined}
          value={values.nombre}
          onChange={(e) => onChange("nombre", e.target.value)}
          onBlur={() => onBlurField("nombre")}
          required
        />
        {errors.nombre && shouldShowError("nombre") && (
          <div className="invalid-feedback" id="nombre-error">
            {errors.nombre}
          </div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="apellidos">
          Apellidos *
        </label>
        <input
          id="apellidos"
          name="apellidos"
          type="text"
          className={`form-control ${
            errors.apellidos && shouldShowError("apellidos") ? "is-invalid" : ""
          }`}
          aria-invalid={errors.apellidos && shouldShowError("apellidos")}
          aria-describedby={errors.apellidos ? "apellidos-error" : undefined}
          value={values.apellidos}
          onChange={(e) => onChange("apellidos", e.target.value)}
          onBlur={() => onBlurField("apellidos")}
          required
        />
        {errors.apellidos && shouldShowError("apellidos") && (
          <div className="invalid-feedback" id="apellidos-error">
            {errors.apellidos}
          </div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="telefono">
          Teléfono *
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          className={`form-control ${
            errors.telefono && shouldShowError("telefono") ? "is-invalid" : ""
          }`}
          aria-invalid={errors.telefono && shouldShowError("telefono")}
          aria-describedby={errors.telefono ? "telefono-error" : undefined}
          value={values.telefono}
          onChange={(e) => onChange("telefono", e.target.value)}
          onBlur={() => onBlurField("telefono")}
          required
        />
        {errors.telefono && shouldShowError("telefono") && (
          <div className="invalid-feedback" id="telefono-error">
            {errors.telefono}
          </div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="email">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`form-control ${
            errors.email && shouldShowError("email") ? "is-invalid" : ""
          }`}
          aria-invalid={errors.email && shouldShowError("email")}
          aria-describedby={errors.email ? "email-error" : undefined}
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          onBlur={() => onBlurField("email")}
          required
        />
        {errors.email && shouldShowError("email") && (
          <div className="invalid-feedback" id="email-error">
            {errors.email}
          </div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="dni">
          DNI *
        </label>
        <input
          id="dni"
          name="dni"
          type="text"
          className={`form-control ${
            errors.dni && shouldShowError("dni") ? "is-invalid" : ""
          }`}
          aria-invalid={errors.dni && shouldShowError("dni")}
          aria-describedby={errors.dni ? "dni-error" : undefined}
          value={values.dni}
          onChange={(e) => onChange("dni", e.target.value)}
          onBlur={() => onBlurField("dni")}
          required
        />
        {errors.dni && shouldShowError("dni") && (
          <div className="invalid-feedback" id="dni-error">
            {errors.dni}
          </div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="nacimiento">
          Fecha de nacimiento *
        </label>
        <input
          id="nacimiento"
          name="nacimiento"
          type="date"
          className={`form-control ${
            errors.nacimiento && shouldShowError("nacimiento")
              ? "is-invalid"
              : ""
          }`}
          aria-invalid={errors.nacimiento && shouldShowError("nacimiento")}
          aria-describedby={
            errors.nacimiento ? "nacimiento-error" : undefined
          }
          value={values.nacimiento}
          onChange={(e) => onChange("nacimiento", e.target.value)}
          onBlur={() => onBlurField("nacimiento")}
          required
        />
        {errors.nacimiento && shouldShowError("nacimiento") && (
          <div className="invalid-feedback" id="nacimiento-error">
            {errors.nacimiento}
          </div>
        )}
      </div>
      <div className="col-md-12">
        <label className="form-label" htmlFor="direccion">
          Dirección *
        </label>
        <input
          id="direccion"
          name="direccion"
          type="text"
          className={`form-control ${
            errors.direccion && shouldShowError("direccion") ? "is-invalid" : ""
          }`}
          aria-invalid={errors.direccion && shouldShowError("direccion")}
          aria-describedby={errors.direccion ? "direccion-error" : undefined}
          value={values.direccion}
          onChange={(e) => onChange("direccion", e.target.value)}
          onBlur={() => onBlurField("direccion")}
          required
        />
        {errors.direccion && shouldShowError("direccion") && (
          <div className="invalid-feedback" id="direccion-error">
            {errors.direccion}
          </div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="codigoPostal">
          Código postal *
        </label>
        <input
          id="codigoPostal"
          name="codigoPostal"
          type="text"
          className={`form-control ${
            errors.codigoPostal && shouldShowError("codigoPostal")
              ? "is-invalid"
              : ""
          }`}
          aria-invalid={errors.codigoPostal && shouldShowError("codigoPostal")}
          aria-describedby={
            errors.codigoPostal ? "codigoPostal-error" : undefined
          }
          value={values.codigoPostal}
          onChange={(e) => onChange("codigoPostal", e.target.value)}
          onBlur={() => onBlurField("codigoPostal")}
          required
        />
        {errors.codigoPostal && shouldShowError("codigoPostal") && (
          <div className="invalid-feedback" id="codigoPostal-error">
            {errors.codigoPostal}
          </div>
        )}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="localizacion">
          Localización *
        </label>
        <input
          id="localizacion"
          name="localizacion"
          type="text"
          className={`form-control ${
            errors.localizacion && shouldShowError("localizacion")
              ? "is-invalid"
              : ""
          }`}
          aria-invalid={errors.localizacion && shouldShowError("localizacion")}
          aria-describedby={
            errors.localizacion ? "localizacion-error" : undefined
          }
          value={values.localizacion}
          onChange={(e) => onChange("localizacion", e.target.value)}
          onBlur={() => onBlurField("localizacion")}
          required
        />
        {errors.localizacion && shouldShowError("localizacion") && (
          <div className="invalid-feedback" id="localizacion-error">
            {errors.localizacion}
          </div>
        )}
      </div>
    </>
  );
}

export default PlayerInfoFormView;
