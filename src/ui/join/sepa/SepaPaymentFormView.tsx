import type {
  JoinRequestErrors,
  JoinRequestValues
} from "../../../application/join/joinRequestPresenter";

type SepaPaymentFormViewProps = {
  values: JoinRequestValues;
  errors: JoinRequestErrors;
  showHolderFields: boolean;
  onChange: (field: keyof JoinRequestValues, value: string) => void;
  onToggleChange: (field: keyof JoinRequestValues, checked: boolean) => void;
  onBlurField: (field: keyof JoinRequestValues) => void;
  shouldShowError: (field: keyof JoinRequestValues) => boolean;
};

function SepaPaymentFormView({
  values,
  errors,
  showHolderFields,
  onChange,
  onToggleChange,
  onBlurField,
  shouldShowError
}: SepaPaymentFormViewProps) {
  return (
    <>
      <div className="col-12">
        <h5 className="mt-4 mb-2">Datos bancarios (SEPA)</h5>
      </div>
      <div className="col-12">
        <div className="form-check form-switch">
          <input
            id="titularMismoQueJugador"
            className="form-check-input"
            type="checkbox"
            checked={values.titularMismoQueJugador}
            onChange={(e) =>
              onToggleChange("titularMismoQueJugador", e.target.checked)
            }
          />
          <label className="form-check-label" htmlFor="titularMismoQueJugador">
            El titular de la cuenta es el mismo que el jugador
          </label>
        </div>
      </div>
      {showHolderFields && (
        <>
          <div className="col-md-6">
            <label className="form-label" htmlFor="titularNombre">
              Nombre del titular *
            </label>
            <input
              id="titularNombre"
              name="titularNombre"
              type="text"
              className={`form-control ${
                errors.titularNombre && shouldShowError("titularNombre")
                  ? "is-invalid"
                  : ""
              }`}
              aria-invalid={
                errors.titularNombre && shouldShowError("titularNombre")
              }
              aria-describedby={
                errors.titularNombre ? "titularNombre-error" : undefined
              }
              value={values.titularNombre}
              onChange={(e) => onChange("titularNombre", e.target.value)}
              onBlur={() => onBlurField("titularNombre")}
              required
            />
            {errors.titularNombre && shouldShowError("titularNombre") && (
              <div className="invalid-feedback" id="titularNombre-error">
                {errors.titularNombre}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="titularEmail">
              Email del titular *
            </label>
            <input
              id="titularEmail"
              name="titularEmail"
              type="email"
              className={`form-control ${
                errors.titularEmail && shouldShowError("titularEmail")
                  ? "is-invalid"
                  : ""
              }`}
              aria-invalid={
                errors.titularEmail && shouldShowError("titularEmail")
              }
              aria-describedby={
                errors.titularEmail ? "titularEmail-error" : undefined
              }
              value={values.titularEmail}
              onChange={(e) => onChange("titularEmail", e.target.value)}
              onBlur={() => onBlurField("titularEmail")}
              required
            />
            {errors.titularEmail && shouldShowError("titularEmail") && (
              <div className="invalid-feedback" id="titularEmail-error">
                {errors.titularEmail}
              </div>
            )}
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="titularDireccion">
              Dirección del titular *
            </label>
            <input
              id="titularDireccion"
              name="titularDireccion"
              type="text"
              className={`form-control ${
                errors.titularDireccion && shouldShowError("titularDireccion")
                  ? "is-invalid"
                  : ""
              }`}
              aria-invalid={
                errors.titularDireccion && shouldShowError("titularDireccion")
              }
              aria-describedby={
                errors.titularDireccion ? "titularDireccion-error" : undefined
              }
              value={values.titularDireccion}
              onChange={(e) => onChange("titularDireccion", e.target.value)}
              onBlur={() => onBlurField("titularDireccion")}
              required
            />
            {errors.titularDireccion && shouldShowError("titularDireccion") && (
              <div className="invalid-feedback" id="titularDireccion-error">
                {errors.titularDireccion}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="titularCodigoPostal">
              Código postal del titular *
            </label>
            <input
              id="titularCodigoPostal"
              name="titularCodigoPostal"
              type="text"
              className={`form-control ${
                errors.titularCodigoPostal &&
                shouldShowError("titularCodigoPostal")
                  ? "is-invalid"
                  : ""
              }`}
              aria-invalid={
                errors.titularCodigoPostal &&
                shouldShowError("titularCodigoPostal")
              }
              aria-describedby={
                errors.titularCodigoPostal
                  ? "titularCodigoPostal-error"
                  : undefined
              }
              value={values.titularCodigoPostal}
              onChange={(e) => onChange("titularCodigoPostal", e.target.value)}
              onBlur={() => onBlurField("titularCodigoPostal")}
              required
            />
            {errors.titularCodigoPostal &&
              shouldShowError("titularCodigoPostal") && (
              <div className="invalid-feedback" id="titularCodigoPostal-error">
                {errors.titularCodigoPostal}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="titularLocalizacion">
              Localidad del titular *
            </label>
            <input
              id="titularLocalizacion"
              name="titularLocalizacion"
              type="text"
              className={`form-control ${
                errors.titularLocalizacion &&
                shouldShowError("titularLocalizacion")
                  ? "is-invalid"
                  : ""
              }`}
              aria-invalid={
                errors.titularLocalizacion &&
                shouldShowError("titularLocalizacion")
              }
              aria-describedby={
                errors.titularLocalizacion
                  ? "titularLocalizacion-error"
                  : undefined
              }
              value={values.titularLocalizacion}
              onChange={(e) => onChange("titularLocalizacion", e.target.value)}
              onBlur={() => onBlurField("titularLocalizacion")}
              required
            />
            {errors.titularLocalizacion &&
              shouldShowError("titularLocalizacion") && (
              <div className="invalid-feedback" id="titularLocalizacion-error">
                {errors.titularLocalizacion}
              </div>
            )}
          </div>
        </>
      )}
      <div className="col-md-6">
        <label className="form-label" htmlFor="iban">
          IBAN *
        </label>
        <input
          id="iban"
          name="iban"
          type="text"
          className={`form-control ${
            errors.iban && shouldShowError("iban") ? "is-invalid" : ""
          }`}
          aria-invalid={errors.iban && shouldShowError("iban")}
          aria-describedby={errors.iban ? "iban-error" : undefined}
          value={values.iban}
          onChange={(e) => onChange("iban", e.target.value)}
          onBlur={() => onBlurField("iban")}
          required
        />
        {errors.iban && shouldShowError("iban") && (
          <div className="invalid-feedback" id="iban-error">
            {errors.iban}
          </div>
        )}
      </div>
      <div className="col-12">
        <div className="form-check">
          <input
            id="sepaMandate"
            className={`form-check-input ${
              errors.acceptSepaMandate ? "is-invalid" : ""
            }`}
            type="checkbox"
            checked={values.acceptSepaMandate}
            onChange={(e) =>
              onToggleChange("acceptSepaMandate", e.target.checked)
            }
            aria-invalid={
              errors.acceptSepaMandate && shouldShowError("acceptSepaMandate")
            }
            aria-describedby={
              errors.acceptSepaMandate ? "acceptSepaMandate-error" : undefined
            }
          />
          <label className="form-check-label" htmlFor="sepaMandate">
            Acepto el mandato SEPA *
          </label>
          {errors.acceptSepaMandate && shouldShowError("acceptSepaMandate") && (
            <div
              className="invalid-feedback d-block"
              id="acceptSepaMandate-error"
            >
              {errors.acceptSepaMandate}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SepaPaymentFormView;
