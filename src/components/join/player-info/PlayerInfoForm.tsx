import type { JoinFormHandlers } from "../JoinForm.types";
import PlayerInfoFormView from "./PlayerInfoFormView";

type PlayerInfoFormProps = Pick<JoinFormHandlers, "values" | "errors" | "onChange">;

function PlayerInfoForm({ values, errors, onChange }: PlayerInfoFormProps) {
  return (
    <PlayerInfoFormView values={values} errors={errors} onChange={onChange} />
  );
}

export default PlayerInfoForm;
