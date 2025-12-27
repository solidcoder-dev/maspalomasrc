import { Link } from "react-router-dom";
import type { JoinFormValues } from "../JoinForm.types";

type PrivacyFormViewProps = {
  values: JoinFormValues;
  errors: Partial<Record<keyof JoinFormValues, string>>;
  onToggleChange: (field: keyof JoinFormValues, checked: boolean) => void;
};

function PrivacyFormView({
  values,
  errors,
  onToggleChange
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
        />
        <label className="form-check-label" htmlFor="privacidad">
          He leído y acepto la <Link to="/privacidad">política de privacidad</Link>{" "}
          y el <Link to="/aviso-legal">aviso legal</Link>
        </label>
        {errors.acceptPrivacy && (
          <div className="invalid-feedback d-block">
            {errors.acceptPrivacy}
          </div>
        )}
      </div>
    </div>
  );
}

export default PrivacyFormView;
