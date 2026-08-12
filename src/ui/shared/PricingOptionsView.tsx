export type PricingOption = {
  title: string;
  description?: string;
  price: string;
  cadence?: string;
  note?: string;
};

type PricingOptionsViewProps = {
  label: string;
  title: string;
  subtitle?: string;
  options: PricingOption[];
};

function PricingOptionsView({ label, title, subtitle, options }: PricingOptionsViewProps) {
  return (
    <div className="mb-4 p-4 p-md-5 border rounded-4 bg-body shadow-sm">
      <span className="text-uppercase small text-body-secondary">{label}</span>
      <h3 className="h4 fw-semibold mt-2 mb-2">{title}</h3>
      {subtitle && <p className="text-body-emphasis mb-4">{subtitle}</p>}
      <div className="d-grid gap-3">
        {options.map((option) => (
          <div key={option.title} className="p-4 border rounded-4 bg-body shadow-sm">
            <div className="d-flex flex-column flex-md-row align-items-start gap-3">
              <div className="flex-grow-1">
                <h4 className="h5 fw-semibold text-body-emphasis mb-2">{option.title}</h4>
                {option.description && <p className="text-body-secondary mb-0 text-break">{option.description}</p>}
              </div>
              <div className="text-md-end flex-shrink-0">
                {option.cadence && <span className="badge bg-primary-subtle text-primary-emphasis">{option.cadence}</span>}
                <div className="mt-2"><span className="h4 fw-bold text-body-emphasis text-nowrap mb-0">{option.price}</span></div>
                {option.note && <div className="small text-body-secondary mt-2 text-md-end">{option.note}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingOptionsView;
