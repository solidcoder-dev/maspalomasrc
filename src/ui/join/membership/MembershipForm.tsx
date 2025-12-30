import type { JoinRequestHandlers } from "../../../application/join/joinRequestPresenter";
import MembershipFormView from "./MembershipFormView";

type MembershipFormProps = Pick<
  JoinRequestHandlers,
  "values" | "errors" | "onChange" | "onFileChange" | "onBlurField" | "shouldShowError"
>;

function MembershipForm({
  values,
  errors,
  onChange,
  onFileChange,
  onBlurField,
  shouldShowError
}: MembershipFormProps) {
  return (
    <MembershipFormView
      values={values}
      errors={errors}
      onChange={onChange}
      onFileChange={onFileChange}
      onBlurField={onBlurField}
      shouldShowError={shouldShowError}
    />
  );
}

export default MembershipForm;
