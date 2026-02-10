import type { JoinContentPort } from "../ports/join-content-port";
import JoinEnrollmentView from "./join/JoinEnrollmentView";
import JoinFeesView from "./join/JoinFeesView";
import JoinIntroView from "./join/JoinIntroView";
import { useJoinPresenter } from "./join/useJoinPresenter";

type JoinSectionProps = {
  joinContentPort: JoinContentPort;
};

function JoinSection({ joinContentPort }: JoinSectionProps) {
  const {
    intro,
    fees,
    enrollment,
    error,
    isLoading
  } = useJoinPresenter({ joinContentPort });

  return (
    <section>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
        <h1 className="h4 fw-bold mb-0">Únete a nuestro club</h1>
      </div>
      {error && (
        <p className="text-danger mb-3" role="alert">
          {error}
        </p>
      )}
      {isLoading && !error && (
        <p className="text-body-secondary mb-3">Cargando información...</p>
      )}
      {intro && fees && enrollment && !error && (
        <>
          <JoinIntroView intro={intro} />
          <JoinFeesView fees={fees} />
          <JoinEnrollmentView enrollment={enrollment} />
        </>
      )}
    </section>
  );
}

export default JoinSection;
