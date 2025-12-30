import type { JoinRequestHandlers } from "../../../application/join/joinRequestPresenter";
import PlayerInfoFormView from "./PlayerInfoFormView";

type PlayerInfoFormProps = Pick<
  JoinRequestHandlers,
  "values" | "errors" | "onChange" | "onBlurField" | "shouldShowError"
>;

function PlayerInfoForm({
  values,
  errors,
  onChange,
  onBlurField,
  shouldShowError
}: PlayerInfoFormProps) {
  return (
    <PlayerInfoFormView
      values={values}
      errors={errors}
      onChange={onChange}
      onBlurField={onBlurField}
      shouldShowError={shouldShowError}
    />
  );
}

export default PlayerInfoForm;
