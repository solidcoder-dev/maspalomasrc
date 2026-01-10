import type { JoinFeesDTO } from "../../domain/joinContent";

type JoinFeesViewProps = {
  fees: JoinFeesDTO;
};

function JoinFeesView({ fees }: JoinFeesViewProps) {
  return (
    <div className="mb-4 p-4 p-md-5 border rounded-4 bg-body shadow-sm">
      <span className="text-uppercase small text-body-secondary">
        Cuotas
      </span>
      <h3 className="h4 fw-semibold mt-2 mb-2">{fees.title}</h3>
      <p className="text-body-emphasis mb-4">{fees.subtitle}</p>
      <div className="d-grid gap-3">
        {fees.fees.map((fee) => (
          <div key={fee.label} className="p-4 border rounded-4 bg-body shadow-sm">
            <div className="d-flex flex-column flex-md-row align-items-start gap-3">
              <div className="flex-grow-1">
                <h4 className="h5 fw-semibold text-body-emphasis mb-2">
                  {fee.label}
                </h4>
                <p className="text-body-secondary mb-0 text-break">
                  {fee.description}
                </p>
              </div>
              <div className="text-md-end flex-shrink-0">
                <span className="badge bg-primary-subtle text-primary-emphasis">
                  {fee.cadence}
                </span>
                <div className="mt-2">
                  <span className="h4 fw-bold text-body-emphasis text-nowrap mb-0">
                    {fee.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JoinFeesView;
