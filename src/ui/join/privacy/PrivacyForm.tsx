import type { JoinRequestHandlers } from "../../../application/join/joinRequestPresenter";
import PrivacyFormView from "./PrivacyFormView";

type PrivacyFormProps = Pick<
  JoinRequestHandlers,
  "values" | "errors" | "onToggleChange" | "shouldShowError"
>;

function PrivacyForm({
  values,
  errors,
  onToggleChange,
  shouldShowError
}: PrivacyFormProps) {
  return (
    <PrivacyFormView
      values={values}
      errors={errors}
      onToggleChange={onToggleChange}
      shouldShowError={shouldShowError}
    />
  );
}

export default PrivacyForm;
