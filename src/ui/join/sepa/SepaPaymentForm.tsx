import type { JoinRequestHandlers } from "../../../application/join/joinRequestPresenter";
import SepaPaymentFormView from "./SepaPaymentFormView";

type SepaPaymentFormProps = Pick<
  JoinRequestHandlers,
  "values" | "errors" | "onChange" | "onToggleChange" | "onBlurField" | "shouldShowError"
>;

function SepaPaymentForm({
  values,
  errors,
  onChange,
  onToggleChange,
  onBlurField,
  shouldShowError
}: SepaPaymentFormProps) {
  const showHolderFields = !values.titularMismoQueJugador;

  return (
    <SepaPaymentFormView
      values={values}
      errors={errors}
      showHolderFields={showHolderFields}
      onChange={onChange}
      onToggleChange={onToggleChange}
      onBlurField={onBlurField}
      shouldShowError={shouldShowError}
    />
  );
}

export default SepaPaymentForm;
