import { useState } from "react";
import JoinRequestForm from "./join/JoinRequestForm";
import JoinSubmissionModalView from "./join/JoinSubmissionModalView";
import type { Club } from "../domain/club";
import { createSubmitJoinRequestUseCase } from "../application/join/submitJoinRequestUseCase";
import type { JoinRequestValues } from "../application/join/joinRequestPresenter";

type JoinSectionProps = {
  club: Club | null;
  submitJoinRequestUseCase: ReturnType<typeof createSubmitJoinRequestUseCase>;
};

function JoinSection({ club, submitJoinRequestUseCase }: JoinSectionProps) {
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const handleJoinRequest = async (values: JoinRequestValues) => {
    if (!club) return;
    const result = await submitJoinRequestUseCase({ values, club });
    setPdfDataUrl(result.pdfDataUrl);
    setPlayerName(result.mandate.debtorName);
    setShowModal(true);
  };

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h1 className="card-title h4 fw-bold mb-3">Únete</h1>
        <p className="text-secondary mb-4">
          Completa el formulario para iniciar el alta. Nos pondremos en contacto
          contigo para confirmar los próximos pasos.
        </p>
        {showModal && pdfDataUrl && club?.email && (
          <JoinSubmissionModalView
            playerName={playerName}
            clubEmail={club.email}
            pdfDataUrl={pdfDataUrl}
            onClose={() => setShowModal(false)}
          />
        )}
        <JoinRequestForm onSubmitRequest={handleJoinRequest} />
      </div>
    </section>
  );
}

export default JoinSection;
