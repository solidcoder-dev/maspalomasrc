import type { JoinFormValues } from "../JoinForm.types";

type SepaPaymentFormViewProps = {
  values: JoinFormValues;
  errors: Partial<Record<keyof JoinFormValues, string>>;
  showHolderFields: boolean;
  onChange: (field: keyof JoinFormValues, value: string) => void;
  onToggleChange: (field: keyof JoinFormValues, checked: boolean) => void;
};

function SepaPaymentFormView({
  values,
  errors,
  showHolderFields,
  onChange,
  onToggleChange
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
              Nombre del titular
            </label>
            <input
              id="titularNombre"
              name="titularNombre"
              type="text"
              className={`form-control ${errors.titularNombre ? "is-invalid" : ""}`}
              value={values.titularNombre}
              onChange={(e) => onChange("titularNombre", e.target.value)}
              required
            />
            {errors.titularNombre && (
              <div className="invalid-feedback">{errors.titularNombre}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="titularEmail">
              Email del titular
            </label>
            <input
              id="titularEmail"
              name="titularEmail"
              type="email"
              className={`form-control ${errors.titularEmail ? "is-invalid" : ""}`}
              value={values.titularEmail}
              onChange={(e) => onChange("titularEmail", e.target.value)}
              required
            />
            {errors.titularEmail && (
              <div className="invalid-feedback">{errors.titularEmail}</div>
            )}
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="titularDireccion">
              Dirección del titular
            </label>
            <input
              id="titularDireccion"
              name="titularDireccion"
              type="text"
              className={`form-control ${
                errors.titularDireccion ? "is-invalid" : ""
              }`}
              value={values.titularDireccion}
              onChange={(e) => onChange("titularDireccion", e.target.value)}
              required
            />
            {errors.titularDireccion && (
              <div className="invalid-feedback">{errors.titularDireccion}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="titularCodigoPostal">
              Código postal del titular
            </label>
            <input
              id="titularCodigoPostal"
              name="titularCodigoPostal"
              type="text"
              className={`form-control ${
                errors.titularCodigoPostal ? "is-invalid" : ""
              }`}
              value={values.titularCodigoPostal}
              onChange={(e) => onChange("titularCodigoPostal", e.target.value)}
              required
            />
            {errors.titularCodigoPostal && (
              <div className="invalid-feedback">
                {errors.titularCodigoPostal}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="titularLocalizacion">
              Localidad del titular
            </label>
            <input
              id="titularLocalizacion"
              name="titularLocalizacion"
              type="text"
              className={`form-control ${
                errors.titularLocalizacion ? "is-invalid" : ""
              }`}
              value={values.titularLocalizacion}
              onChange={(e) => onChange("titularLocalizacion", e.target.value)}
              required
            />
            {errors.titularLocalizacion && (
              <div className="invalid-feedback">
                {errors.titularLocalizacion}
              </div>
            )}
          </div>
        </>
      )}
      <div className="col-md-6">
        <label className="form-label" htmlFor="iban">
          IBAN
        </label>
        <input
          id="iban"
          name="iban"
          type="text"
          className={`form-control ${errors.iban ? "is-invalid" : ""}`}
          value={values.iban}
          onChange={(e) => onChange("iban", e.target.value)}
          required
        />
        {errors.iban && <div className="invalid-feedback">{errors.iban}</div>}
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
          />
          <label className="form-check-label" htmlFor="sepaMandate">
            Acepto el mandato SEPA
          </label>
          {errors.acceptSepaMandate && (
            <div className="invalid-feedback d-block">
              {errors.acceptSepaMandate}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SepaPaymentFormView;
