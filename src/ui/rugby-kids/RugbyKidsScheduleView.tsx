import type { RugbyKidsScheduleDTO } from "../../domain/rugbyKids";

function RugbyKidsScheduleView({ schedule }: { schedule: RugbyKidsScheduleDTO }) {
  return <div className="mb-4 p-4 p-md-5 border rounded-4 bg-body shadow-sm"><span className="text-uppercase small text-body-secondary">Horarios</span><h3 className="h4 fw-semibold mt-2 mb-4">{schedule.title}</h3><div className="row g-3">{schedule.seasons.map((season) => <div className="col-lg-6" key={season.name}><div className="h-100 p-4 border rounded-4 bg-body-tertiary"><h4 className="h5 fw-semibold mb-3">{season.name}</h4><ul className="list-unstyled mb-0 d-grid gap-2">{season.sessions.map((session) => <li key={session} className="text-body-emphasis">{session}</li>)}</ul></div></div>)}</div></div>;
}

export default RugbyKidsScheduleView;
