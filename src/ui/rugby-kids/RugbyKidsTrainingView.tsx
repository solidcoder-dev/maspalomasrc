import type { Club } from "../../domain/club";
import TrainingMapView from "../shared/TrainingMapView";

const trainingLocation = "Campo de césped · Campus de Tafira";

function RugbyKidsTrainingView({ training }: { training: Club["training"] }) {
  return <div className="mb-4 p-4 p-md-5 border rounded-4 bg-primary-subtle"><span className="text-uppercase small text-body-secondary">Entrenamientos</span><h3 className="h4 fw-semibold mt-2 mb-2">Campo de Tafira</h3><p className="text-body-emphasis mb-4">{trainingLocation}</p><TrainingMapView location={trainingLocation} mapsUrl={training.mapsUrl} /></div>;
}

export default RugbyKidsTrainingView;
