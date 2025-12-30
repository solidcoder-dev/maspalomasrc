import { useJoinRequestPresenter } from "../useJoinRequest";
import type { JoinRequestValues } from "../../application/join/joinRequestPresenter";
import MembershipForm from "./membership/MembershipForm";
import PlayerInfoForm from "./player-info/PlayerInfoForm";
import PrivacyForm from "./privacy/PrivacyForm";
import SepaPaymentForm from "./sepa/SepaPaymentForm";
import SignatureForm from "./signature/SignatureForm";
import SubmitForm from "./submit/SubmitForm";

type JoinFormProps = {
  onSubmitRequest: (values: JoinRequestValues) => void;
};

function JoinRequestForm({ onSubmitRequest }: JoinFormProps) {
  const handlers = useJoinRequestPresenter({ onSubmitRequest });
  const { submitDisabled, isSubmitting } = handlers;

  return (
    <form className="row g-3" onSubmit={handlers.onSubmit}>
      <PlayerInfoForm {...handlers} />
      <MembershipForm {...handlers} />
      <SepaPaymentForm {...handlers} />
      <SignatureForm {...handlers} />
      <PrivacyForm {...handlers} />
      <SubmitForm submitDisabled={submitDisabled} isSubmitting={isSubmitting} />
    </form>
  );
}

export default JoinRequestForm;
