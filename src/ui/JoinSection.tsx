import type { JoinContentPort } from "../ports/join-content-port";
import JoinBankInfoView from "./join/JoinBankInfoView";
import JoinFeesView from "./join/JoinFeesView";
import JoinIntroView from "./join/JoinIntroView";
import JoinPaymentProcessView from "./join/JoinPaymentProcessView";
import { useJoinPresenter } from "./join/useJoinPresenter";

type JoinSectionProps = {
  joinContentPort: JoinContentPort;
  clubName?: string;
};

function JoinSection({ joinContentPort, clubName }: JoinSectionProps) {
  const {
    intro,
    fees,
    paymentProcess,
    bankInfo,
    error,
    isLoading
  } = useJoinPresenter({ joinContentPort });

  return (
    <section>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
        <h1 className="h4 fw-bold mb-0">Cuota de entrenamiento</h1>
      </div>
      {error && (
        <p className="text-danger mb-3" role="alert">
          {error}
        </p>
      )}
      {isLoading && !error && (
        <p className="text-body-secondary mb-3">Cargando información...</p>
      )}
      {intro && fees && paymentProcess && bankInfo && !error && (
        <>
          <JoinIntroView intro={intro} />
          <div className="row g-4">
            <div className="col-lg-6">
              <JoinFeesView fees={fees} />
            </div>
            <div className="col-lg-6">
              <JoinPaymentProcessView paymentProcess={paymentProcess} />
            </div>
          </div>
          <JoinBankInfoView bankInfo={bankInfo} clubName={clubName} />
        </>
      )}
    </section>
  );
}

export default JoinSection;
