import { Link } from "react-router-dom";
import type {
  JoinRequestErrors,
  JoinRequestValues
} from "../../../application/join/joinRequestPresenter";

type PrivacyFormViewProps = {
  values: JoinRequestValues;
  errors: JoinRequestErrors;
  onToggleChange: (field: keyof JoinRequestValues, checked: boolean) => void;
  shouldShowError: (field: keyof JoinRequestValues) => boolean;
};

function PrivacyFormView({
  values,
  errors,
  onToggleChange,
  shouldShowError
}: PrivacyFormViewProps) {
  return (
    <div className="col-12">
      <div className="form-check">
        <input
          id="privacidad"
          className={`form-check-input ${
            errors.acceptPrivacy ? "is-invalid" : ""
          }`}
          type="checkbox"
          checked={values.acceptPrivacy}
          onChange={(e) => onToggleChange("acceptPrivacy", e.target.checked)}
          aria-invalid={errors.acceptPrivacy && shouldShowError("acceptPrivacy")}
          aria-describedby={
            errors.acceptPrivacy ? "acceptPrivacy-error" : undefined
          }
        />
        <label className="form-check-label" htmlFor="privacidad">
          He leído y acepto la{" "}
          <Link to="/privacidad">política de privacidad</Link> y el{" "}
          <Link to="/aviso-legal">aviso legal</Link> *
        </label>
        {errors.acceptPrivacy && shouldShowError("acceptPrivacy") && (
          <div className="invalid-feedback d-block" id="acceptPrivacy-error">
            {errors.acceptPrivacy}
          </div>
        )}
      </div>
    </div>
  );
}

export default PrivacyFormView;
