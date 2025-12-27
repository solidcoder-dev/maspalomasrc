import type { JoinFormHandlers } from "../JoinForm.types";
import PrivacyFormView from "./PrivacyFormView";

type PrivacyFormProps = Pick<
  JoinFormHandlers,
  "values" | "errors" | "onToggleChange"
>;

function PrivacyForm({ values, errors, onToggleChange }: PrivacyFormProps) {
  return (
    <PrivacyFormView
      values={values}
      errors={errors}
      onToggleChange={onToggleChange}
    />
  );
}

export default PrivacyForm;
