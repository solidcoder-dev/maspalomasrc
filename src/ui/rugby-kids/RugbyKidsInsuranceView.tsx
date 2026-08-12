import type { RugbyKidsInsuranceDTO } from "../../domain/rugbyKids";

function RugbyKidsInsuranceView({ insurance }: { insurance: RugbyKidsInsuranceDTO }) {
  return <div className="mb-4 p-4 p-md-5 border rounded-4 bg-body-tertiary"><span className="text-uppercase small text-body-secondary">Seguro</span><div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-2"><div><h3 className="h4 fw-semibold mb-2">{insurance.title}</h3><p className="text-body-emphasis mb-0">{insurance.text}</p></div><div className="text-md-end flex-shrink-0"><span className="badge bg-primary-subtle text-primary-emphasis">{insurance.cadence}</span><div className="h4 fw-bold mt-2 mb-0 text-nowrap">{insurance.price}</div></div></div></div>;
}

export default RugbyKidsInsuranceView;
