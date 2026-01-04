import type { JoinRequestHandlers } from "../../../application/join/joinRequestPresenter";
import MembershipFormView from "./MembershipFormView";

type MembershipFormProps = Pick<
  JoinRequestHandlers,
  "values" | "errors" | "onChange" | "onBlurField" | "shouldShowError"
>;

function MembershipForm({
  values,
  errors,
  onChange,
  onBlurField,
  shouldShowError
}: MembershipFormProps) {
  return (
    <MembershipFormView
      values={values}
      errors={errors}
      onChange={onChange}
      onBlurField={onBlurField}
      shouldShowError={shouldShowError}
    />
  );
}

export default MembershipForm;
